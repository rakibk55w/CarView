import { useNavigate } from "react-router-dom";

import BidCard from "./BidCard";

export default function BidHistory({
    bids,
    isLoading,
    hasMore,
    onLoadMore
}) {
    const navigate = useNavigate();

    function handleScroll(event) {
        const element = event.currentTarget;

        const isNearBottom =
            element.scrollHeight -
            element.scrollTop -
            element.clientHeight <
            100;

        if (
            isNearBottom &&
            !isLoading &&
            hasMore
        ) {
            onLoadMore();
        }
    }

    return (
        <section>
            <h2 className="
                mb-5
                text-2xl
                font-semibold
                text-gray-900
                dark:text-white">
                Bid History
            </h2>

            <div
                className="
                    max-h-145
                    space-y-4
                    overflow-y-auto
                    
                    border
                    border-gray-200
                    bg-gray-50
                    p-4
                    dark:border-gray-700
                    dark:bg-gray-900"
                onScroll={handleScroll}>

                {!isLoading && bids.length === 0 && (
                    <p className="
                        py-6
                        text-center
                        text-gray-500
                        dark:text-gray-400">
                        No bids placed yet.
                    </p>
                )}

                {bids.map((bid) => (
                    <BidCard
                        key={bid.id}
                        bidder={bid.bidder_name}
                        bidAmount={bid.bid_amount}
                        timestamp={bid.created_at}
                        onBidderClick={() => {
                            navigate(
                                `/profile/${bid.bidder_id}`
                            );
                        }}
                    />
                ))}

                {isLoading && (
                    <div className="
                        flex
                        justify-center
                        py-4">
                        <div className="
                            h-6
                            w-6
                            animate-spin
                            rounded-full
                            border-2
                            border-gray-300
                            border-t-gray-700
                            dark:border-gray-600
                            dark:border-t-gray-200"
                        />
                    </div>
                )}

            </div>
        </section>
    );
}