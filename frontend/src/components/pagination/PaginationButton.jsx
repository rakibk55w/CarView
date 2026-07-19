export default function PaginationButton({
    children,
    circle = true,
    active = false,
    disabled = false,
    onClick,
}) {
    return (
        <button className={`
            flex
            h-10
            items-center
            justify-center
            border
            text-sm
            font-medium
            transition-all
            duration-200
            ${
                circle
                    ? `w-10 rounded-full`
                    : `min-w-10 rounded-lg`
            }
            ${
                active
                    ? `
                        border-primary-600
                        bg-primary-600
                        text-white
                        hover:border-primary-700
                        hover:bg-primary-700
                    `
                    : `
                        border-gray-300
                        bg-white
                        text-gray-700
                        hover:border-primary-500
                        hover:bg-primary-50
                        hover:text-primary-600
                        dark:border-gray-700
                        dark:bg-gray-800
                        dark:text-gray-200
                        dark:hover:border-primary-500
                        dark:hover:bg-primary-900/30
                        dark:hover:text-primary-400
                    `
            }
            ${
                disabled
                    ? `
                        cursor-not-allowed
                        opacity-50
                    `
                    : `
                        cursor-pointer
                    `
            }`}
            type="button"
            disabled={disabled}
            onClick={onClick}>
                
            {children}
        </button>
    );
}