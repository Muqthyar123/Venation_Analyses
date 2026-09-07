import json
from functools import lru_cache
from pathlib import Path

from app.config.settings import get_settings


def display_name(plant: dict) -> str:
    return f"{plant['scientific_name']} ({plant['common_name']})"


@lru_cache
def load_plants() -> list[dict]:
    path = Path(__file__).resolve().parents[1] / "dataset" / "plant_metadata.json"
    with path.open(encoding="utf-8") as handle:
        plants = json.load(handle)
    return plants


def class_names() -> list[str]:
    return [display_name(plant) for plant in load_plants()]


def label_mapping() -> dict[int, str]:
    return dict(enumerate(class_names()))


def find_plant(name: str) -> dict | None:
    normalized = name.lower().replace("_", " ").replace("-", " ")
    for plant in load_plants():
        candidates = {
            plant["scientific_name"].lower(),
            plant["common_name"].lower(),
            display_name(plant).lower(),
        }
        if normalized in candidates or any(normalized in candidate for candidate in candidates):
            return plant
    return None


def plant_response(plant: dict) -> dict:
    uses = plant["medicinal_uses"]
    return {
        "scientific_name": plant["scientific_name"],
        "scientificName": plant["scientific_name"],
        "common_name": plant["common_name"],
        "name": plant["common_name"],
        "medicinal_uses": uses,
        "uses": uses,
        "description": plant["description"],
    }


def static_url(path: Path) -> str:
    settings = get_settings()
    relative = path.resolve().relative_to(settings.static_dir.resolve()).as_posix()
    return f"/static/{relative}"
