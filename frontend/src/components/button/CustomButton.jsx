import { primaryButtonStyle, socialButtonStyle, dangerButtonStyle } from "../../utils/buttonStyles";

export default function CustomButton({
    icon,
    children,
    type = "button",
    disabled = false,
    primaryButton = true,
    dangerButton = false,
    onClick,
    className = ""
}) {
    const buttonClass = dangerButton 
        ? dangerButtonStyle 
        : (primaryButton 
            ? primaryButtonStyle 
            : socialButtonStyle);

    return (
        <button className={`
            cursor-pointer
            py-3
            transition-colors
            rounded-lg
            flex
            items-center
            justify-center
            gap-2
            disabled:cursor-not-allowed
            disabled:opacity-60
            ${buttonClass}
            ${className}`}
            type={type}
            disabled={disabled}
            onClick={onClick}>
            {icon}
            {children}
        </button>
    );
}