import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import CarCard from "../car/CarCard";
import axiosAuthInstance from "../../api/axiosAuthInstance";
import { showErrorToast } from "../../utils/toast";
import { searchBarStyle } from "../../utils/headerStyles";
import AuctionSearchSkeleton from "./AuctionSearchSkeleton";

const LIMIT = 5;
const SEARCH_DELAY = 500;

export default function AuctionSearch() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [nextCursor, setNextCursor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const searchTimeoutRef = useRef(null);
    const abortControllerRef = useRef(null);
    const searchRef = useRef(null);
    const optionsRef = useRef(null);

    const fetchResults = async ({
        search,
        cursor = null,
        append = false,
    }) => {
        if (!search) {
            return;
        }

        if (append) {
            setIsLoadingMore(true);
        } else {
            setIsLoading(true);
        }

        try {
            const response = await axiosAuthInstance.get(
                "/",
                {
                    params: {
                        search,
                        limit: LIMIT,
                        ...(cursor && {
                            cursorCreatedAt: cursor.cursorCreatedAt,
                            cursorId: cursor.cursorId,
                        }),
                    },
                    signal: abortControllerRef.current?.signal,
                }
            );

            const {
                data,
                pagination,
            } = response.data;

            setResults((previousResults) =>
                append
                    ? [...previousResults, ...data]
                    : data
            );

            setNextCursor(
                pagination.nextCursor
            );

            setHasSearched(true);
            setIsOpen(true);
        } catch (error) {
            if (error.name === "CanceledError") {
                return;
            }

            showErrorToast(
                error.response?.data?.message ||
                "Failed to search auctions."
            );
        } finally {
            if (append) {
                setIsLoadingMore(false);
            } else {
                setIsLoading(false);
            }
        }
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;

        setSearchTerm(value);
        setHasSearched(false);
        setNextCursor(null);
        setResults([]);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        if (!value.trim()) {
            setIsOpen(false);
            return;
        }

        searchTimeoutRef.current = setTimeout(() => {
            abortControllerRef.current =
                new AbortController();

            fetchResults({
                search: value.trim(),
            });
        }, SEARCH_DELAY);
    };

    const handleScroll = () => {
        const container = optionsRef.current;

        if (
            !container ||
            isLoading ||
            isLoadingMore ||
            !nextCursor
        ) {
            return;
        }

        const isNearBottom =
            container.scrollTop +
            container.clientHeight >=
            container.scrollHeight - 50;

        if (isNearBottom) {
            fetchResults({
                search: searchTerm.trim(),
                cursor: nextCursor,
                append: true,
            });
        }
    };

    const handleResultClick = (auction) => {
        setIsOpen(false);
        navigate(`/auctions/${auction.id}`);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(
                    searchTimeoutRef.current
                );
            }

            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return (
        <div className="
            relative
            w-full
            max-w-lg"
            ref={searchRef}>

            <FiSearch className="
                absolute
                left-4
                top-1/2
                z-10
                -translate-y-1/2
                text-gray-500"
                size={18}
            />

            <input className={searchBarStyle}
                type="text"
                value={searchTerm}
                placeholder="Search auctions..."
                onChange={handleSearchChange}
                onFocus={() => {
                    if (
                        searchTerm.trim() &&
                        (results.length > 0 ||
                        isLoading)
                    ) {
                        setIsOpen(true);
                    }
                }}
            />

            {isOpen && (
                <div className="
                    absolute
                    left-0
                    right-0
                    top-full
                    z-50
                    mt-2
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    shadow-xl
                    dark:border-gray-700
                    dark:bg-gray-800">

                    <div className="
                        max-h-112
                        overflow-y-auto
                        p-3"
                        ref={optionsRef}
                        onScroll={handleScroll}>

                        {isLoading && (
                            <div className="
                                flex
                                flex-col
                                gap-3">

                                <AuctionSearchSkeleton />
                                <AuctionSearchSkeleton />
                                <AuctionSearchSkeleton />
                            </div>
                        )}

                        {!isLoading &&
                            results.map((auction) => (
                                <div className="
                                    mb-3
                                    last:mb-0"
                                    key={auction.id}>

                                    <CarCard
                                        car={{
                                            ...auction,
                                            image: auction.images?.[0],
                                        }}
                                        showHover={false}
                                        onClick={() =>
                                            handleResultClick(
                                                auction
                                            )
                                        }
                                    />
                                </div>
                            ))
                        }

                        {isLoadingMore && (
                            <div className="
                                flex
                                flex-col
                                gap-3
                                pt-3">

                                <AuctionSearchSkeleton />
                            </div>
                        )}

                        {!isLoading &&
                            hasSearched &&
                            results.length === 0 && (
                                <p className="
                                    py-8
                                    text-center
                                    text-sm
                                    text-gray-500
                                    dark:text-gray-400">

                                    No auctions found.
                                </p>
                            )}

                        {!isLoading &&
                            !isLoadingMore &&
                            results.length > 0 &&
                            !nextCursor && (
                                <p className="
                                    py-4
                                    text-center
                                    text-sm
                                    text-gray-500
                                    dark:text-gray-400">

                                    No more results.
                                </p>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
}