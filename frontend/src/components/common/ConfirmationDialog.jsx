import { useEffect } from "react";
import { createPortal } from "react-dom";

import CustomButton from "../button/CustomButton";

import {
    FiTrash2,
    FiX
} from "react-icons/fi";

export default function ConfirmationDialog({
    isOpen,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel
}) {

    useEffect(() => {

        if (!isOpen) {
            return;
        }

        const handleEscape = (event) => {

            if (event.key === "Escape") {
                onCancel();
            }

        };

        window.addEventListener("keydown", handleEscape);

        return () => {

            window.removeEventListener("keydown", handleEscape);

        };

    }, [isOpen, onCancel]);

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
            bg-black/60
            p-4"
            onClick={onCancel}>

            <div className="
                w-full
                max-w-md
                rounded-xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-xl
                dark:border-gray-700
                dark:bg-gray-800"
                onClick={(event) => event.stopPropagation()}>

                <h2 className="
                    mb-4
                    text-xl
                    font-semibold">

                    {title}
                </h2>

                <p className="
                    mb-8
                    text-gray-600
                    dark:text-gray-300">

                    {message}
                </p>

                <div className="
                    flex
                    justify-end
                    gap-3">

                    <CustomButton className="w-24"
                        icon={<FiX />}
                        onClick={onCancel}>

                        {cancelText}
                    </CustomButton>

                    <CustomButton className="w-28"
                        dangerButton={true}
                        icon={<FiTrash2 />}
                        onClick={onConfirm}>

                        {confirmText}
                    </CustomButton>
                </div>
            </div>
        </div>,

        document.body
    );
}