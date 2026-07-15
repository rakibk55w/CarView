import { useEffect, useRef, useState } from "react";
import { showErrorToast } from "../utils/toast";
import {
    createImagePreview,
    revokeImagePreview,
    validateImage,
} from "../utils/imageHelpers";

export default function useImageUpload({
    initialImage,
    onImageSelected}) {

    const [previewImage, setPreviewImage] = useState(initialImage);

    const fileInputRef = useRef(null);

    useEffect(() => {

        return () => {
            revokeImagePreview(previewImage);
        };

    }, [previewImage]);

    function openFilePicker() {
        fileInputRef.current?.click();
    }

    async function handleFileSelected(event) {

        const file = event.target.files?.[0];

        const validation = validateImage(file);

        if (validation.cancelled) {
            return;
        }

        if (!validation.isValid) {
            showErrorToast(validation.error);
            console.log(validation.error);
            event.target.value = "";
            return;

        }

        revokeImagePreview(previewImage);

        const previewUrl = createImagePreview(file);

        setPreviewImage(previewUrl);

        try {
            if (onImageSelected) {
                await onImageSelected(file, previewUrl);
            }

        }
        catch (error) {
            revokeImagePreview(previewUrl);
            setPreviewImage(initialImage);
            showErrorToast(error.message || "Image upload failed.");
        }
        event.target.value = "";
    }

    function resetPreview(image) {
        revokeImagePreview(previewImage);
        setPreviewImage(image);
    }

    return {
        previewImage,
        setPreviewImage,
        fileInputRef,
        openFilePicker,
        handleFileSelected,
        resetPreview,
    };
}