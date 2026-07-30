import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BidCard from "../components/bid/BidCard";
import BidCardSkeleton from "../components/bid/BidCardSkeleton";
import Pagination from "../components/pagination/Pagination";

import axiosAuthInstance from "../api/axiosAuthInstance";
import useAuth from "../hooks/useAuth";
import { showErrorToast } from "../utils/toast";


const LIMIT = 5;

export default function MyBids() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [bids, setBids] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                setIsLoading(true);

                const response = await axiosAuthInstance.get(
                    "/my-bids",
                    {
                        params: {
                            page,
                            limit: LIMIT,
                        },
                    }
                );

                setBids(response.data.items);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                showErrorToast(
                    error.response?.data?.message ||
                    "Failed to fetch bids"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchBids();
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
                {isLoading ? (
                    Array.from({ length: LIMIT }).map(
                        (_, index) => (
                            <BidCardSkeleton
                                key={index}
                            />
                        )
                    )
                ) : bids.length === 0 ? (
                    <div className="
                        py-12
                        text-center
                        text-gray-500
                        dark:text-gray-400">
                        You haven't placed any bids yet.
                    </div>
                ) : (
                    bids.map((bid) => (
                        <BidCard
                            key={bid.id}
                            bidderName={bid.user_name}
                            isOwnBid={bid.bidder_id === user.id}
                            bidAmount={bid.bid_amount}
                            auctionTitle={bid.car_title}
                            timestamp={bid.bid_created_at}
                            onAuctionClick={() =>
                                navigate(
                                    `/auctions/${bid.auction_id}`
                                )
                            }
                            onBidderClick={() =>
                                navigate(
                                    `/profile/${bid.bidder_id}`
                                )
                            }
                        />
                    ))
                )}
            </div>

            {!isLoading && totalPages > 1 && (
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
            )}
        </section>
    );
}