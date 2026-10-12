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


def _normalize_name(value: str) -> str:
    return "".join(char.lower() for char in value if char.isalnum())


def _plant_folder(plant: dict) -> Path | None:
    settings = get_settings()
    expected_names = {
        display_name(plant),
        plant["scientific_name"],
        plant["common_name"],
    }

    for name in expected_names:
        folder = settings.dataset_dir / name
        if folder.exists() and folder.is_dir():
            return folder

    if not settings.dataset_dir.exists():
        return None

    scientific = _normalize_name(plant["scientific_name"])
    common = _normalize_name(plant["common_name"])
    for folder in sorted(path for path in settings.dataset_dir.iterdir() if path.is_dir()):
        normalized = _normalize_name(folder.name)
        if scientific in normalized or common in normalized:
            return folder
    return None


def sample_image_path(plant: dict) -> Path | None:
    settings = get_settings()
    folder = _plant_folder(plant)
    sample = _first_image(folder) if folder else None
    if sample:
        return sample

    filename = SAMPLE_IMAGES_BY_SCIENTIFIC_NAME.get(plant["scientific_name"])
    if not filename:
        return None

    path = settings.dataset_dir / filename
    return path if path.exists() else None


def _dataset_image_url(path: Path) -> str:
    settings = get_settings()
    relative = path.resolve().relative_to(settings.dataset_dir.resolve()).as_posix()
    return f"/dataset-images/{quote(relative)}"


def _dataset_download_url(path: Path) -> str:
    settings = get_settings()
    relative = path.resolve().relative_to(settings.dataset_dir.resolve()).as_posix()
    return f"/download-dataset-image/{quote(relative)}"


def sample_image_url(scientific_name: str) -> str | None:
    for plant in load_plants():
        if plant["scientific_name"] == scientific_name:
            path = sample_image_path(plant)
            return _dataset_image_url(path) if path else None
    return None


def sample_image_download_url(scientific_name: str) -> str | None:
    for plant in load_plants():
        if plant["scientific_name"] == scientific_name:
            path = sample_image_path(plant)
            return _dataset_download_url(path) if path else None
    return None


def dataset_samples() -> list[dict]:
    samples = []
    for index, plant in enumerate(load_plants(), start=1):
        folder_name = display_name(plant)
        image_path = sample_image_path(plant)
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
