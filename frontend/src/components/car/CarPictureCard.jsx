import { useState } from "react";

import ImagePreviewModal from "../common/ImagePreviewModal";
import CarPictureCarousel from "./CarPictureCarousel";

const PLACEHOLDER_IMAGE = "https://placehold.co/1200x800?text=No+Image";

export default function CarPictureCard({
    images = [],
    title,
}) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(
        PLACEHOLDER_IMAGE
    );

    function handleImageClick(image) {
        setSelectedImage(image);
        setIsPreviewOpen(true);
    }

    return (
        <>
            <section className="
                flex
                flex-col
                items-center
                lg:items-start">

                <CarPictureCarousel
                    images={images}
                    title={title}
                    onImageClick={handleImageClick}
                />
            </section>

            <ImagePreviewModal
                isOpen={isPreviewOpen}
                image={selectedImage}
                alt={title}
                onClose={() => setIsPreviewOpen(false)}
            />
        </>
    );
}