import { useMemo, useState } from "react";

import BidCard from "../components/bids/BidCard";
import Pagination from "../components/pagination/Pagination";
import mockBids from "../data/mockBids";

const LIMIT = 5;

export default function MyBids() {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(
        mockBids.length / LIMIT
    );

    const displayedBids = useMemo(() => {
        const offset = (page - 1) * LIMIT;

        return mockBids.slice(
            offset,
            offset + LIMIT
        );
    }, [page]);

    return (
        <section className="
            mx-auto
            max-w-5xl
            px-4
            py-8">
            <h1 className="
                mb-8
                text-3xl
                font-bold
                text-primary-600">
                My Bids
            </h1>

            <div className="
                flex
                flex-col
                gap-4">
                {displayedBids.map((bid) => (
                    <BidCard
                        key={bid.id}
                        bidder="You"
                        bidAmount={bid.bidAmount}
                        auctionTitle={bid.auctionTitle}
                        timestamp={bid.timestamp}
                        onAuctionClick={() => {}}
                    />
                ))}
            </div>

            <div className="
                mt-10
                flex
                justify-center">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </section>
    );
}