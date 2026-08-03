import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axiosInstance";

import AuctionCard from "../components/auction/AuctionCard";
import AuctionCardSkeleton from "../components/auction/AuctionCardSkeleton";

import { showErrorToast } from "../utils/toast";

const LIMIT = 3;

export default function Home() {
    const navigate = useNavigate();

    const [auctions, setAuctions] = useState([]);
    const [pagination, setPagination] = useState({
        hasMore: true,
        nextCursor: null,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const observer = useRef(null);

    const [now, setNow] = useState(Date.now);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchAuctions = useCallback(async (loadMore = false) => {
        if (loadMore) {
            if (isLoadingMore || !pagination.hasMore) {
                return;
            }

            setIsLoadingMore(true);
        } else{
            setHasError(false);
        }

        try {
            const params = {
                limit: LIMIT,
            };

            if (loadMore && pagination.nextCursor) {
                params.cursorCreatedAt =
                    pagination.nextCursor.cursorCreatedAt;

                params.cursorId =
                    pagination.nextCursor.cursorId;
            }

            const response = await axiosInstance.get("/", {
                params,
            });

            const {
                data,
                pagination: newPagination,
            } = response.data;

            setAuctions((previous) =>
                loadMore
                    ? [...previous, ...data]
                    : data
            );

            setPagination(newPagination);
            setHasError(false);
        } catch (error) {
            setHasError(true);
            

            showErrorToast(
                error.response?.data?.message || 
                "Could not load auctions."
            );
        } finally {
            if (loadMore) {
                setIsLoadingMore(false);
            } else {
                setIsLoading(false);
            }
        }
    }, [isLoadingMore, pagination.hasMore, pagination.nextCursor]);

    const lastAuctionRef = useCallback(
        (node) => {
            if (isLoading || isLoadingMore) {
                return;
            }

            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver((entries) => {
                if (
                    entries[0].isIntersecting &&
                    pagination.hasMore
                ) {
                    fetchAuctions(true);
                }
            });

            if (node) {
                observer.current.observe(node);
            }
        },
        [fetchAuctions, isLoading, isLoadingMore, pagination.hasMore]
    );

    if (!hasFetched) {
        setHasFetched(true);

        Promise.resolve().then(() => {
            fetchAuctions();
        });
    }

    if (isLoading) {
        return (
            <div
                className="
                    flex
                    flex-col
                    gap-6">
                {Array.from({ length: LIMIT }).map((_, index) => (
                    <AuctionCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (hasError) {
        return (
            <div
                className="
                    py-8
                    text-center
                    text-red-500">
                Could not load auctions.
            </div>
        );
    }

    return (
        <div
            className="
                flex
                flex-col
                gap-6">

            {auctions.map((auction, index) => (
                <div
                    key={auction.id}
                    ref={
                        index === auctions.length - 1
                            ? lastAuctionRef
                            : null
                    }>

                    <AuctionCard
                        auction={auction}
                        onClick={() =>
                            navigate(`/auctions/${auction.id}`)
                        }
                        now={now}
                    />

                </div>
            ))}

            {isLoadingMore && (
                <>
                    <AuctionCardSkeleton />
                    <AuctionCardSkeleton />
                    <AuctionCardSkeleton />
                </>
            )}

            {!pagination.hasMore && auctions.length > 0 && (
                <div
                    className="
                        py-6
                        text-center
                        text-sm
                        text-gray-500">
                    No more auctions.
                </div>
            )}
        </div>
    );
}