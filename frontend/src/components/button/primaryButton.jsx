export default function PrimaryButton({
    children,
    type = "button",
    disabled = false,
    onClick,
    className = "",
}) {
    return (
        <button className={`
            w-full
            cursor-pointer
            rounded-lg
            bg-primary-600
            py-3
            font-medium
            text-white
            transition-colors
            hover:bg-primary-700
            disabled:cursor-not-allowed
            disabled:opacity-60
            ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}>
            {children}
        </button>
    );
}