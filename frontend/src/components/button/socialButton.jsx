export default function SocialButton({
    icon,
    children,
    onClick,
}) {
    return (
        <button className="
            flex
            w-full
            items-center
            justify-center
            gap-3
            cursor-pointer
            rounded-lg
            border
            border-gray-300
            py-3
            transition-colors
            hover:bg-gray-50
            dark:border-gray-700
            dark:hover:bg-gray-900"
            type="button"
            onClick={onClick}>
            {icon}
            {children}
        </button>
    );
}