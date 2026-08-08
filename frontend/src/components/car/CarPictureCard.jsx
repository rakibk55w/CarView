import { useState } from "react";

import { FiImage, FiTrash2 } from "react-icons/fi";

import ImagePreviewModal from "../common/ImagePreviewModal";
import CarPictureCarousel from "./CarPictureCarousel";

import CustomButton from "../button/CustomButton";
import ConfirmationDialog from "../common/ConfirmationDialog";

import useCarImageUpload from "../../hooks/useCarImageUpload";
import axiosAuthInstance from "../../api/axiosAuthInstance";

import { showErrorToast, showSuccessToast } from "../../utils/toast";

const PLACEHOLDER_IMAGE = "https://placehold.co/1200x800?text=No+Image";

export default function CarPictureCard({
    carId,
    images = [],
    title,
    isOwnCar,
    isLoading,
    setImages
}) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const imageList = images ?? [];

    const displayedImages = imageList.length > 0
        ? imageList
        : [
            {
                image_url: PLACEHOLDER_IMAGE,
            },
          ];

    const selectedImage = displayedImages[selectedIndex]
        ?.image_url ?? PLACEHOLDER_IMAGE;

    const {
        fileInputRef,
        openFilePicker,
        handleFilesSelected,
        isUploading,
    } = useCarImageUpload({
        carId,
        images: imageList,
        setImages,
    });

    function handleImageClick(
        image,
        index
    ) {
        setSelectedIndex(index);
        setIsPreviewOpen(true);
    }

    async function handleDeleteImage() {
        const image = imageList[selectedIndex];

        if (!image) {
            return;
        }

        const previousImages = [...imageList];

        setShowDeleteDialog(false);

        setImages((previous) =>
            previous.filter((_, index) =>
                index !==
                selectedIndex
            )
        );

        setSelectedIndex((previous) =>
            Math.max(
                0,
                previous - 1
            )
        );

        try {
            const response = await axiosAuthInstance.delete(
                `/car-images/${image.id}`
            );

            showSuccessToast(
                response.data.message ||
                "Image deleted successfully."
            );

        } catch (error) {
            setImages(
                previousImages
            );

            showErrorToast(
                error.response?.data?.message ||
                "Failed to delete image."
            );
        }
    }

    if (isLoading) {
        return (
            <section className="
                flex
                flex-col
                items-center
                lg:items-start">

                <div className="
                    h-60
                    w-full
                    max-w-md
                    animate-pulse
                    rounded-xl
                    bg-gray-200
                    dark:bg-gray-700"
                />

                {isOwnCar && (
                    <div className="
                        mt-5
                        flex
                        w-full
                        max-w-md
                        flex-col
                        gap-3">

                        <div className="
                            h-10
                            animate-pulse
                            rounded-lg
                            bg-gray-200
                            dark:bg-gray-700"
                        />

                        <div className="
                            h-10
                            animate-pulse
                            rounded-lg
                            bg-gray-200
                            dark:bg-gray-700"
                        />

                    </div>
                )}

            </section>
        );
    }

    return (
        <>
            <section className="
                flex
                flex-col
                items-center
                lg:items-start">

                <CarPictureCarousel
                    images={displayedImages}
                    title={title || "Car image"}
                    selectedIndex={selectedIndex}
                    onSelectedIndexChange={setSelectedIndex}
                    onImageClick={handleImageClick}
                />

                {isOwnCar && (
                    <>
                        <div className="
                            mt-5
                            flex
                            w-full
                            flex-col
                            gap-3">

                            <CustomButton
                                icon={<FiImage />}
                                disabled={
                                    isUploading ||
                                    imageList.length >= 5
                                }
                                onClick={openFilePicker}>

                                {isUploading
                                    ? "Uploading..."
                                    : `Upload Images (${imageList.length}/5)`
                                }
                            </CustomButton>

                            <CustomButton
                                dangerButton
                                icon={<FiTrash2 />}
                                disabled={
                                    imageList.length ===
                                    0
                                }
                                onClick={() =>
                                    setShowDeleteDialog(
                                        true
                                    )
                                }>

                                Delete Current Image
                            </CustomButton>
                        </div>

                        <input hidden
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="
                                .jpg,
                                .jpeg,
                                .png,
                                .webp"
                            onChange={handleFilesSelected}
                        />
                    </>
                )}
            </section>

            <ImagePreviewModal
                isOpen={isPreviewOpen}
                image={selectedImage}
                alt={title || "Car image"}
                onClose={() => setIsPreviewOpen(false)}
            />

            {isOwnCar && (
                <ConfirmationDialog
                    isOpen={showDeleteDialog}
                    title="Delete Car Image"
                    message="Are you sure you want to delete this car image? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                    onCancel={() => setShowDeleteDialog(false)}
                    onConfirm={handleDeleteImage}
                />
            )}
        </>
    );
}