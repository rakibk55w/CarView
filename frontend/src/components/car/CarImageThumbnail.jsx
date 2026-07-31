import { FiX } from "react-icons/fi";

export default function CarImageThumbnail({
    preview,
    onRemove,
}) {
    return (
        <div className="
            relative
            h-24
            w-24
            shrink-0
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-gray-100
            shadow-sm
            dark:border-gray-700
            dark:bg-gray-900">

            <img className="
                h-full
                w-full
                object-cover"
                src={preview}
                alt="Selected car"
            />

            <button className="
                absolute
                top-1.5
                right-1.5

                flex
                h-6
                w-6
                cursor-pointer
                items-center
                justify-center

                rounded-full

                bg-red-500
                text-white

                shadow-md

                transition-colors
                hover:bg-red-600"
                type="button"
                onClick={onRemove}
                aria-label="Remove image">

                <FiX size={16} />

            </button>

        </div>
    );
}