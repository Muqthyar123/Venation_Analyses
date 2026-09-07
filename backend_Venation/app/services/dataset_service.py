from pathlib import Path
from urllib.parse import quote

from app.config.settings import get_settings
from app.services.metadata_service import display_name, load_plants

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp", ".tif", ".tiff"}

SAMPLE_IMAGES_BY_SCIENTIFIC_NAME = {
    "Alpinia Galanga": "AG-S.jpg",
    "Amaranthus Viridis": "AH-S.jpg",
    "Artocarpus Heterophyllus": "AI-S.jpg",
    "Azadirachta Indica": "AV-S.jpg",
    "Basella Alba": "BA-S.jpg",
    "Brassica Juncea": "BJ-S-002.jpg",
    "Carissa Carandas": "CC-S-028.jpg",
    "Citrus Limon": "CL-S.jpg",
    "Ficus Auriculata": "FA-S.jpg",
    "Ficus Religiosa": "FR-S.jpg",
    "Hibiscus Rosa-sinensis": "HR-S.jpg",
    "Jasminum": "J-S.jpg",
    "Mangifera Indica": "MC-S.jpg",
    "Mentha": "MI-S.jpg",
    "Moringa Oleifera": "MK-S.jpg",
    "Muntingia Calabura": "MO-S.jpg",
    "Murraya Koenigii": "M-S.jpg",
    "Nerium Oleander": "NA-S.jpg",
    "Nyctanthes Arbor-tristis": "NO-S.jpg",
    "Ocimum Tenuiflorum": "OT-S.jpg",
    "Piper Betle": "PA-S.jpg",
    "Plectranthus Amboinicus": "PB-S.jpg",
    "Pongamia Pinnata": "PG-S (2).jpg",
    "Psidium Guajava": "PG-S.jpg",
    "Punica Granatum": "PP-S.jpg",
    "Santalum Album": "SA-S.jpg",
    "Syzygium Cumini": "SC-S.jpg",
    "Syzygium Jambos": "SJ-S.jpg",
    "Tabernaemontana Divaricata": "TD-S.jpg",
    "Trigonella Foenum-graecum": "TF-S.jpg",
}


def _first_image(directory: Path) -> Path | None:
    for path in sorted(directory.iterdir()):
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS:
            return path
    return None


def _dataset_image_url(path: Path) -> str:
    settings = get_settings()
    relative = path.resolve().relative_to(settings.dataset_dir.resolve()).as_posix()
    return f"/dataset-images/{quote(relative)}"


def _dataset_download_url(path: Path) -> str:
    settings = get_settings()
    relative = path.resolve().relative_to(settings.dataset_dir.resolve()).as_posix()
    return f"/download-dataset-image/{quote(relative)}"


def sample_image_url(scientific_name: str) -> str | None:
    settings = get_settings()
    filename = SAMPLE_IMAGES_BY_SCIENTIFIC_NAME.get(scientific_name)
    if filename:
        path = settings.dataset_dir / filename
        if path.exists():
            return _dataset_image_url(path)
    return None


def sample_image_download_url(scientific_name: str) -> str | None:
    settings = get_settings()
    filename = SAMPLE_IMAGES_BY_SCIENTIFIC_NAME.get(scientific_name)
    if filename:
        path = settings.dataset_dir / filename
        if path.exists():
            return _dataset_download_url(path)
    return None


def dataset_samples() -> list[dict]:
    settings = get_settings()
    samples = []
    for index, plant in enumerate(load_plants(), start=1):
        folder_name = display_name(plant)
        folder = settings.dataset_dir / folder_name
        sample = _first_image(folder) if folder.exists() else None
        image_path = sample
        if not image_path:
            filename = SAMPLE_IMAGES_BY_SCIENTIFIC_NAME.get(plant["scientific_name"])
            image_path = settings.dataset_dir / filename if filename else None
            if image_path and not image_path.exists():
                image_path = None
        url = _dataset_image_url(image_path) if image_path else sample_image_url(plant["scientific_name"])
        download_url = _dataset_download_url(image_path) if image_path else url
        samples.append(
            {
                "id": f"plant-{index}",
                "plant_name": folder_name,
                "name": plant["common_name"],
                "scientific_name": plant["scientific_name"],
                "scientificName": plant["scientific_name"],
                "common_name": plant["common_name"],
                "medicinal_uses": plant["medicinal_uses"],
                "uses": plant["medicinal_uses"],
                "description": plant["description"],
                "image_path": url,
                "image": url,
                "download_url": download_url,
            }
        )
    return samples
