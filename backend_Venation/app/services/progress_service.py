from threading import Lock

_progress: dict[str, dict] = {}
_lock = Lock()


def set_progress(job_id: str, percent: int, status: str = "processing") -> None:
    with _lock:
        _progress[job_id] = {"job_id": job_id, "progress": percent, "status": status}


def get_progress(job_id: str) -> dict:
    with _lock:
        return _progress.get(job_id, {"job_id": job_id, "progress": 0, "status": "unknown"})
