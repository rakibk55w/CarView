export default function CarInfoRow({
    label,
    value,
    isMultiLineField = false,
}) {
    const displayValue =
        value === null ||
        value === undefined ||
        value === ""
            ? "Not specified"
            : value;

    return (
        <div>
            <p className="
                font-medium">
                {label}
            </p>

            <p className={
                isMultiLineField
                    ? "whitespace-pre-line"
                    : ""}>
                {displayValue}
            </p>
        </div>
    );
}