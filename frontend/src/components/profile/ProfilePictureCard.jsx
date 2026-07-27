import { useState } from "react";
import { FiCamera, FiTrash2 } from "react-icons/fi";

import CustomButton from "../button/CustomButton";
import ConfirmationDialog from "../common/ConfirmationDialog";
import ImagePreviewModal from "../common/ImagePreviewModal"

import useImageUpload from "../../hooks/useImageUpload";

const PLACEHOLDER_IMAGE = "https://placehold.co/600x600?text=Profile";

export default function ProfilePictureCard({
    profilePicture, 
    fullName,
    isOwnProfile,
    isLoading}) {

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

        onImageSelected: async () => {

            // TODO:
            // await uploadProfilePicture(file);

        },

    });

    const hasProfilePicture = previewImage !== PLACEHOLDER_IMAGE;

    async function handleDeletePicture() {

        // TODO:
        // await deleteProfilePicture();

        resetPreview(PLACEHOLDER_IMAGE);

        setShowDeleteDialog(false);

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
                        src={previewImage || PLACEHOLDER_IMAGE}
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
                image={previewImage || PLACEHOLDER_IMAGE}
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