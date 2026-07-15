import { useState } from "react";
import { FiCamera, FiTrash2 } from "react-icons/fi";

import CustomButton from "../button/CustomButton";
import ConfirmationDialog from "../common/ConfirmationDialog";
import ImagePreviewModal from "../common/ImagePreviewModal"

import useImageUpload from "../../hooks/useImageUpload";

const PLACEHOLDER_IMAGE = "https://placehold.co/600x600?text=Profile";

export default function ProfilePictureCard({
    profilePicture, 
    fullName}) {

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
                        src={previewImage}
                        alt={fullName}
                        onClick={() => setIsPreviewOpen(true)}
                    />
                </div>
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
            </section>
            <ImagePreviewModal
                isOpen={isPreviewOpen}
                image={previewImage}
                alt={fullName}
                onClose={() => setIsPreviewOpen(false)}
            />

            <ConfirmationDialog
                isOpen={showDeleteDialog}
                title="Delete Profile Picture"
                message="Are you sure you want to delete your profile picture? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onCancel={() => setShowDeleteDialog(false)}
                onConfirm={handleDeletePicture}
            />
        </>
    );
}