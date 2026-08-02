import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuctionCard from "../components/auction/AuctionCard";
import AuctionCardSkeleton from "../components/auction/AuctionCardSkeleton";
import CreateAuctionSheet from "../components/auction/CreateAuctionSheet";
import Pagination from "../components/pagination/Pagination";
import CreateButton from "../components/button/CreateButton";

import axiosAuthInstance from "../api/axiosAuthInstance";
import { showErrorToast } from "../utils/toast";

const LIMIT = 3;

export default function MyAuctions() {
    const navigate = useNavigate();
    const [auctions, setAuctions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateAuctionSheetOpen, setIsCreateAuctionSheetOpen] = useState(false);

    const [refreshKey, setRefreshKey] = useState(0);

    const [now, setNow] = useState(Date.now);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleCreateAuction = () => {
        setIsCreateAuctionSheetOpen(true);
    };

    const handleAuctionCreated = () => {
        setPage(1);
        setRefreshKey((prev) => prev + 1);
    };

    useEffect(() => {
        const fetchMyAuctions = async () => {
            try {
                setIsLoading(true);

                const response = await axiosAuthInstance.get(
                    "/my-auctions",
                    {
                        params: {
                            page,
                            limit: LIMIT,
                        },
                    }
                );

                setAuctions(
                    response.data.items
                );

                setTotalPages(
                    response.data.totalPages
                );
            } catch (error) {
                showErrorToast(
                    error.response?.data?.message ||
                    "Failed to fetch your auctions"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyAuctions();
    }, [page, refreshKey]);
    
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

            <CreateButton className="
                mb-6
                px-4
                w-auto"
                title="Create New Auction"
                onClick={handleCreateAuction}
            />

            <div className="
                flex
                flex-col
                gap-6">
                {isLoading ? (
                    Array.from({ length: LIMIT }).map(
                        (_, index) => (
                            <AuctionCardSkeleton
                                key={index}
                            />
                        )
                    )
                ) : auctions.length === 0 ? (
                    <div className="
                        py-12
                        text-center
                        text-gray-500
                        dark:text-gray-400">
                        You haven't created any auctions yet.
                    </div>
                ) : (
                    auctions.map((auction) => (
                        <AuctionCard
                            key={auction.id}
                            auction={auction}
                            now={now}
                            onClick={() =>
                                navigate(
                                    `/auctions/${auction.id}`
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

            <CreateAuctionSheet
                isOpen={isCreateAuctionSheetOpen}
                onClose={() =>
                    setIsCreateAuctionSheetOpen(false)
                }
                onSuccess={handleAuctionCreated}
            />
        </section>
    );
}