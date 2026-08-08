import { useState } from "react";
import { FiCamera, FiTrash2 } from "react-icons/fi";

import CustomButton from "../button/CustomButton";
import ConfirmationDialog from "../common/ConfirmationDialog";
import ImagePreviewModal from "../common/ImagePreviewModal"

import useImageUpload from "../../hooks/useImageUpload";
import axiosAuthInstance from "../../api/axiosAuthInstance";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const PLACEHOLDER_IMAGE = "https://placehold.co/600x600?text=Profile";

export default function ProfilePictureCard({
    profilePicture, 
    fullName,
    isOwnProfile,
    isLoading,
    setProfileImage}) {

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const {
        previewImage,
        fileInputRef,
        openFilePicker,
        handleFileSelected,
        resetPreview,
    } = useImageUpload({

        initialImage: profilePicture || PLACEHOLDER_IMAGE,

        onImageSelected: async (file) => {
            const formData = new FormData();

            formData.append("image", file);

            const response = await axiosAuthInstance.post(
                "/profile/upload-image",
                formData
            );

            setProfileImage(
                response.data.data.image_url
            );

            showSuccessToast(
                response.data.message || "Image uploaded successfully"
            );
        },
    });

    const displayedImage =
    previewImage ||
    profilePicture ||
    PLACEHOLDER_IMAGE;

    const hasProfilePicture = Boolean(profilePicture) || Boolean(previewImage);


    async function handleDeletePicture() {
        const previousImage = profilePicture;
        
        setShowDeleteDialog(false);
        setProfileImage(null);
        resetPreview(null);

        try {
            const response = await axiosAuthInstance.delete(
                "/profile/delete-image"
            );

            showSuccessToast(
                response.data.message || "Profile picture deleted successfully"
            );
        } catch (error) {
            setProfileImage(previousImage);
            showErrorToast(
                error.response?.data?.message ||
                "Failed to delete profile picture"
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
                    w-60
                    animate-pulse
                    rounded-xl
                    bg-gray-200
                    dark:bg-gray-700"
                />

                {isOwnProfile && (
                    <div className="
                        mt-5
                        flex
                        w-60
                        flex-col
                        gap-3">

                        <div className="
                            h-10
                            w-full
                            animate-pulse
                            rounded-lg
                            bg-gray-200
                            dark:bg-gray-700"
                        />

                        <div className="
                            h-10
                            w-full
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
            <section className={`
                flex
                flex-col
                items-center
                lg:items-start`}>
                <div className="
                    h-60
                    w-60
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-100
                    dark:border-gray-700
                    dark:bg-gray-900">
                    <img className="
                        h-full
                        w-full
                        cursor-pointer
                        object-cover"
                        src={displayedImage}
                        alt={fullName || "Profile picture"}
                        onClick={() => setIsPreviewOpen(true)}
                    />
                </div>
                {isOwnProfile && (
                    <>
                        <div className="
                            mt-5
                            flex
                            w-60
                            flex-col
                            gap-3">
                            <CustomButton
                                icon={<FiCamera />}
                                onClick={openFilePicker}>
                                Upload Profile Picture
                            </CustomButton>

                            <CustomButton
                                dangerButton={true}
                                disabled={!hasProfilePicture}
                                icon={<FiTrash2 />}
                                onClick={() => setShowDeleteDialog(true)}>
                                Delete Profile Picture
                            </CustomButton>
                        </div>
                        <input ref={fileInputRef}
                            type="file"
                            hidden
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={handleFileSelected}
                        />
                    </>
                )}
            </section>
            
            <ImagePreviewModal
                isOpen={isPreviewOpen}
                image={displayedImage}
                alt={fullName || "Profile picture"}
                onClose={() => setIsPreviewOpen(false)}
            />

            {isOwnProfile && (
                <ConfirmationDialog
                    isOpen={showDeleteDialog}
                    title="Delete Profile Picture"
                    message="Are you sure you want to delete your profile picture? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                    onCancel={() => setShowDeleteDialog(false)}
                    onConfirm={handleDeletePicture}
                />
            )}
        </>
    );
}