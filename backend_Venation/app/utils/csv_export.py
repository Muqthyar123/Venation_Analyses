import csv
from pathlib import Path


def write_prediction_csv(rows: list[dict], output_path: Path) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["filename", "predicted_class", "confidence", "modelName"],
            extrasaction="ignore",
        )
        writer.writeheader()
        writer.writerows(rows)
    return output_path
