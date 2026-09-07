from fastapi import HTTPException, UploadFile, status

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png"}


def validate_upload(file: UploadFile) -> None:
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file must include a filename.",
        )
    suffix = "." + file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
    if suffix not in SUPPORTED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported image format for {file.filename}. Use JPG, JPEG, or PNG.",
        )


def validate_upload_size(data: bytes, max_size_mb: int) -> None:
    max_bytes = max_size_mb * 1024 * 1024
    if len(data) > max_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Image is too large. Maximum allowed size is {max_size_mb} MB.",
        )
