import { useMemo, useState } from "react";

import AuctionCard from "../components/auction/AuctionCard";
import Pagination from "../components/pagination/Pagination";
import mockAuctions from "../data/mockAuctions";

const LIMIT = 3;

export default function MyAuctions() {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(
        mockAuctions.length / LIMIT
    );

    const displayedAuctions = useMemo(() => {
        const offset = (page - 1) * LIMIT;

        return mockAuctions.slice(
            offset,
            offset + LIMIT
        );
    }, [page]);

    return (
        <section className="
            mx-auto
            max-w-7xl
            px-4
            py-8">
            <h1 className="
                mb-8
                text-3xl
                font-bold
                text-primary-600">
                My Auctions
            </h1>

            <div className="
                flex
                flex-col
                gap-6">
                {displayedAuctions.map((auction) => (
                    <AuctionCard
                        key={auction.id}
                        auction={auction}
                        onClick={() => {}}
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