export default function AuctionStatusBadge({status}) {
    const isActive = status?.toLowerCase() === "active";

    return (
        <span className={`
            shrink-0
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-wide
            ${isActive ? `
                bg-green-100
                text-green-700
                dark:bg-green-900
                dark:text-green-200`
                : `
                    bg-danger-100
                    text-danger-700
                    dark:bg-danger-900
                    dark:text-danger-200`
            }`}>
            {isActive ? "Active" : "Closed"}
        </span>
    );
}