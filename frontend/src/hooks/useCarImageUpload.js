import { useRef, useState } from "react";

import axiosAuthInstance from "../api/axiosAuthInstance";

import {
    createImagePreview,
    revokeImagePreview,
    validateImage,
} from "../utils/imageHelpers";

import {
    showErrorToast,
    showSuccessToast,
} from "../utils/toast";

const MAX_IMAGES = 5;

export default function useCarImageUpload({
    carId,
    images,
    setImages,
}) {
    const [isUploading, setIsUploading] = useState(false);

    const fileInputRef = useRef(null);

    function openFilePicker() {
        fileInputRef.current?.click();
    }

    async function handleFilesSelected(
        event
    ) {
        const selectedFiles = Array.from(
            event.target.files || []
        );

        if (selectedFiles.length === 0) {
            return;
        }

        if (images.length >= MAX_IMAGES) {
            showErrorToast(
                `Maximum ${MAX_IMAGES} images allowed.`
            );

            event.target.value = "";

            return;
        }

        const acceptedFiles = [];

        const previewImages = [];

        for (const file of selectedFiles) {
            if (
                images.length +
                acceptedFiles.length >=
                MAX_IMAGES
            ) {
                showErrorToast(
                    `Maximum ${MAX_IMAGES} images allowed.`
                );

                break;
            }

            const validation = validateImage(file);

            if (!validation.isValid) {
                if (!validation.cancelled) {
                    showErrorToast(
                        validation.error
                    );
                }

                continue;
            }

            acceptedFiles.push(file);

            previewImages.push({
                id: null,
                image_url: createImagePreview(
                    file
                ),
                file,
                isPreview: true,
            });
        }

        if (acceptedFiles.length === 0) {
            event.target.value = "";
            return;
        }

        setImages((previous) => [
            ...previous,
            ...previewImages,
        ]);

        try {
            setIsUploading(true);

            const formData = new FormData();

            acceptedFiles.forEach((file) =>
                formData.append(
                    "images",
                    file
                )
            );

            const response = await axiosAuthInstance.post(
                `/cars/${carId}/images`,
                formData
            );

            previewImages.forEach((image) =>
                revokeImagePreview(
                    image.image_url
                )
            );

            setImages((previous) => [
                ...previous.filter((image) =>
                    !image.isPreview
                ),
                ...response.data.data,
            ]);

            showSuccessToast(
                response.data.message ||
                "Images uploaded successfully."
            );

        } catch (error) {
            previewImages.forEach((image) =>
                revokeImagePreview(
                    image.image_url
                )
            );

            setImages((previous) =>
                previous.filter((image) =>
                    !image.isPreview
                )
            );

            showErrorToast(
                error.response?.data?.message ||
                "Failed to upload images."
            );

        } finally {
            setIsUploading(false);
            event.target.value = "";
        }
    }

    return {
        fileInputRef,
        openFilePicker,
        handleFilesSelected,
        isUploading,
    };
}