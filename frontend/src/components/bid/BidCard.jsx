import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

export default function BidCard({
    bidderName,
    isOwnBid,
    bidAmount,
    auctionTitle = "",
    timestamp,
    onAuctionClick = () => {},
    onBidderClick = () => {},
}) {
    return (
        <article className="
            rounded-xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            transition-shadow
            duration-200
            hover:shadow-md
            dark:border-gray-700
            dark:bg-gray-800">
            <p className="
                text-base
                leading-7
                text-gray-700
                dark:text-gray-200">
                {isOwnBid ? (
                    <span className="font-semibold">
                        You
                    </span>
                ) : (
                    <Link className="
                        font-medium
                        text-primary-600
                        transition-colors
                        duration-200
                        hover:text-primary-700
                        hover:underline"
                        to="#"
                        onClick={(event) => {
                            event.preventDefault();
                            onBidderClick?.();
                        }}>
                        {bidderName}
                    </Link>
                )}{" "}

                bid{" "}

                <span className="font-semibold">
                    {formatCurrency(bidAmount)}
                </span>

                {auctionTitle && (
                    <>
                        {" "}on{" "}
                        <Link className="
                            font-medium
                            text-primary-600
                            transition-colors
                            duration-200
                            hover:text-primary-700
                            hover:underline"
                            to="#"
                            onClick={(event) => {
                                event.preventDefault();
                                onAuctionClick();
                            }}>
                            {auctionTitle}
                        </Link>
                    </>
                )}
                .
            </p>

            <div className="
                mt-4
                flex
                justify-end">
                <span className="
                    text-sm
                    text-gray-500
                    dark:text-gray-400">
                    {timestamp}
                </span>
            </div>
        </article>
    );
}