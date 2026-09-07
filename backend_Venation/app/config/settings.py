from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Venation-Aware Plant Recognition API"
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    debug: bool = Field(default=False, validation_alias="APP_DEBUG")
    backend_dir: Path = Path(__file__).resolve().parents[2]
    project_root: Path = Path(__file__).resolve().parents[3]
    upload_dir: Path = Path(__file__).resolve().parents[2] / "uploads"
    results_dir: Path = Path(__file__).resolve().parents[2] / "results"
    static_dir: Path = Path(__file__).resolve().parents[1] / "static"
    dataset_dir: Path = Path(__file__).resolve().parents[3] / "frontend" / "src" / "images"
    model_dir: Path = Path(__file__).resolve().parents[2] / "trained_models"
    model_path: str | None = None
    default_model_name: str = "hybridnet"
    input_size: int = 224
    max_upload_size_mb: int = 10
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:8081",
        "http://127.0.0.1:8081",
    ]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="",
        case_sensitive=False,
        extra="ignore",
    )

    def ensure_dirs(self) -> None:
        for directory in (self.upload_dir, self.results_dir, self.static_dir, self.model_dir):
            directory.mkdir(parents=True, exist_ok=True)


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    settings.ensure_dirs()
    return settings
