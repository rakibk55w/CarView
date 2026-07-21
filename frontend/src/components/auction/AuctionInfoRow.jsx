export default function AuctionInfoRow({
    label,
    value,
}) {
    return (
        <div className="
            flex
            gap-2">
            <span className="
                w-32
                font-semibold
                text-gray-800
                dark:text-gray-200">
                {label}
            </span>

            <span className="
                text-gray-700
                dark:text-gray-300">
                {value}
            </span>
        </div>
    );
}