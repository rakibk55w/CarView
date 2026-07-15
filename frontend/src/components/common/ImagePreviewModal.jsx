import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

export default function ImagePreviewModal({
    isOpen,
    image,
    alt,
    onClose
}) {

    useEffect(() => {

        if (!isOpen) {
            return;
        }

        const handleEscape = (event) => {

            if (event.key === "Escape") {
                onClose();
            }

        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };

    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return createPortal(

        <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/80
            p-4"
            onClick={onClose}>

            <div className="
                relative
                max-h-full
                max-w-6xl"
                onClick={(event) => event.stopPropagation()}>

                <button className="
                    absolute
                    -top-12
                    right-0
                    cursor-pointer
                    rounded-full
                    p-2
                    text-white
                    transition-colors
                    hover:bg-white/10"
                    onClick={onClose}>

                    <FiX size={28} />

                </button>

                <img className="
                    max-h-[90vh]
                    max-w-full
                    rounded-xl
                    object-contain"
                    src={image}
                    alt={alt}
                />
            </div>
        </div>,

        document.body
    );
}