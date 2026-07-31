import { FaPlus } from "react-icons/fa6";
import CustomButton from "./CustomButton";

export default function CreateButton({
    title,
    onClick,
    className = "",
}) {
    return (
        <CustomButton
            onClick={onClick}
            icon={<FaPlus />}
            className={className}>
            {title}
        </CustomButton>
    );
}