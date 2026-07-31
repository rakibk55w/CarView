import { useEffect, useMemo, useRef } from "react";
import { useField } from "formik";
import { FiImage } from "react-icons/fi";

import CustomButton from "../button/CustomButton";
import CarImageThumbnail from "./CarImageThumbnail";

import {
    validateImage,
    createImagePreview,
    revokeImagePreview,
} from "../../utils/imageHelpers";

import { showErrorToast } from "../../utils/toast";

const MAX_IMAGES = 5;

export default function CarImagePicker({
    name,
    label = "Images",
}) {
    const [
        field,
        meta,
        helpers,
    ] = useField(name);

    const fileInputRef = useRef(null);

    const images = useMemo(() => 
        field.value || [],
        [field.value]
    );

    const imagesRef = useRef([]);

    useEffect(() => {
        imagesRef.current = images;
    }, [images]);

    useEffect(() => {
        return () => {
            imagesRef.current.forEach((image) =>
                revokeImagePreview(image.preview)
            );
        };
    }, []);

    function openPicker() {
        fileInputRef.current?.click();
    }

    function handleFilesSelected(event) {

        const selectedFiles =
            Array.from(
                event.target.files || []
            );

        if (selectedFiles.length === 0) {
            return;
        }

        const nextImages = [...images];

        for (const file of selectedFiles) {

            if (
                nextImages.length >=
                MAX_IMAGES
            ) {

                showErrorToast(
                    `You can upload at most ${MAX_IMAGES} images.`
                );

                break;

            }

            const validation = validateImage(file);

            if (!validation.isValid) {

                if (
                    !validation.cancelled
                ) {

                    showErrorToast(
                        validation.error
                    );

                }

                continue;

            }

            const duplicate =
                nextImages.some(
                    (image) =>
                        image.file.name ===
                            file.name &&
                        image.file.size ===
                            file.size &&
                        image.file.lastModified ===
                            file.lastModified
                );

            if (duplicate) {
                continue;
            }

            nextImages.push({
                file,
                preview:
                    createImagePreview(
                        file
                    ),
            });

        }

        helpers.setValue(nextImages);

        event.target.value = "";
    }

    function removeImage(index) {

        const image = images[index];

        revokeImagePreview(
            image.preview
        );

        helpers.setValue(
            images.filter(
                (_, i) => i !== index
            )
        );

    }

    const hasError = meta.touched && meta.error;

    return (
        <div>
            <label className="
                mb-2
                block
                font-medium">

                {label}

            </label>

            <input className="hidden"
                ref={fileInputRef}
                type="file"
                multiple
                accept="
                    image/jpeg,
                    image/png,
                    image/webp"
                onChange={
                    handleFilesSelected
                }
            />

            <CustomButton className="
                mb-5
                px-4"
                type="button"
                onClick={openPicker}
                icon={<FiImage />}>

                Add Images

            </CustomButton>

            <p className="
                mb-4
                text-sm
                text-gray-500
                dark:text-gray-400">

                {images.length}/{MAX_IMAGES}
                {" "}selected

            </p>

            {images.length > 0 && (
                <div className="
                    flex
                    flex-wrap
                    gap-3">

                    {images.map(
                        (
                            image,
                            index
                        ) => (
                            <CarImageThumbnail
                                key={
                                    image.preview
                                }
                                preview={
                                    image.preview
                                }
                                onRemove={() =>
                                    removeImage(
                                        index
                                    )
                                }
                            />
                        )
                    )}

                </div>
            )}

            {hasError && (
                <p className="
                    mt-2
                    text-sm
                    text-red-500">

                    {meta.error}

                </p>
            )}

        </div>
    );
}