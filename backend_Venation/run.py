import argparse
import os
import socket
import subprocess
import sys

from pathlib import Path


def load_env_defaults() -> tuple[str, int]:
    env_path = Path(__file__).with_name(".env")
    values = {
        "API_HOST": os.environ.get("API_HOST", "0.0.0.0"),
        "API_PORT": os.environ.get("API_PORT", "8000"),
    }

    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            stripped = line.strip()
            if not stripped or stripped.startswith("#") or "=" not in stripped:
                continue
            key, value = stripped.split("=", 1)
            key = key.strip()
            if key in values and key not in os.environ:
                values[key] = value.strip().strip("\"'")

    try:
        port = int(values["API_PORT"])
    except ValueError:
        port = 8000
    return values["API_HOST"], port


def port_owner(port: int) -> str | None:
    try:
        output = subprocess.check_output(["netstat", "-ano"], text=True, stderr=subprocess.DEVNULL)
    except (OSError, subprocess.SubprocessError):
        return None

    for line in output.splitlines():
        parts = line.split()
        if len(parts) >= 5 and parts[0].upper() == "TCP":
            local_address = parts[1]
            state = parts[3].upper()
            pid = parts[4]
            if local_address.endswith(f":{port}") and state == "LISTENING":
                return pid
    return None


def assert_port_available(host: str, port: int) -> None:
    owner = port_owner(port)
    if owner:
        raise SystemExit(
            f"Port {port} is already in use by PID {owner}.\n"
            f"Stop that process, or start this backend on another port:\n"
            f"  python run.py --port {port + 1}"
        )

    probe_host = "0.0.0.0" if host in {"0.0.0.0", "::"} else host
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        try:
            sock.bind((probe_host, port))
        except OSError:
            owner_text = f" PID {owner}" if owner else " another process"
            raise SystemExit(
                f"Port {port} is already in use by{owner_text}.\n"
                f"Stop that process, or start this backend on another port:\n"
                f"  python run.py --port {port + 1}"
            )


def parse_args() -> argparse.Namespace:
    api_host, api_port = load_env_defaults()
    parser = argparse.ArgumentParser(description="Start the Venation API backend.")
    parser.add_argument("--host", default=api_host, help=f"Host to bind, default: {api_host}")
    parser.add_argument("--port", type=int, default=api_port, help=f"Port to bind, default: {api_port}")
    parser.add_argument("--reload", action="store_true", help="Restart the server after code changes.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    assert_port_available(args.host, args.port)
    try:
        import uvicorn
    except ModuleNotFoundError:
        raise SystemExit(
            "Uvicorn is not installed in this Python environment.\n"
            "Install backend dependencies first:\n"
            "  pip install -r requirements.txt"
        )
    uvicorn.run("app.main:app", host=args.host, port=args.port, reload=args.reload)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(0)
