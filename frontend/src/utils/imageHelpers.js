export const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export function validateImage(file) {

    if (!file) {
        return {
            isValid: false,
            cancelled: true,
            error: null,
        };
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return {
            isValid: false,
            cancelled: false,
            error: "Only JPG, JPEG, PNG and WEBP images are allowed.",
        };
    }

    if (file.size > MAX_IMAGE_SIZE) {
        return {
            isValid: false,
            cancelled: false,
            error: "Image size must not exceed 10 MB.",
        };
    }

    return {
        isValid: true,
        cancelled: false,
        error: null,
    };

}

export function createImagePreview(file) {
    return URL.createObjectURL(file);
}

export function revokeImagePreview(previewUrl) {
    if (
        previewUrl &&
        previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
    }
}