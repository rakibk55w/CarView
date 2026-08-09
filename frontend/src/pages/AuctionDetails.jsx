import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AuctionDetailsCard from "../components/auction/AuctionDetailsCard";
import BidHistory from "../components/bid/BidHistory";

import axiosAuthInstance from "../api/axiosAuthInstance";
import { showErrorToast } from "../utils/toast";
import useAuth from "../hooks/useAuth";

export default function AuctionDetails() {
    const { auctionId } = useParams();
    const { user } = useAuth();

    const [auction, setAuction] = useState(null);
    const [bids, setBids] = useState([]);

    const [isAuctionLoading, setIsAuctionLoading] = useState(true);
    const [isBidsLoading, setIsBidsLoading] = useState(true);

    const [bidPage, setBidPage] = useState(1);
    const [hasMoreBids, setHasMoreBids] = useState(true);

    const isAuctionOwner = auction?.owner_id === user?.id;
    
    useEffect(() => {
        const fetchAuction = async () => {
            setIsAuctionLoading(true);

            try {
                const response = await axiosAuthInstance.get(
                    `/auctions/${auctionId}`
                );

                setAuction(response.data.data);
            } catch (error) {
                showErrorToast(
                    error.response?.data?.message ||
                    "Failed to fetch auction details."
                );
            } finally {
                setIsAuctionLoading(false);
            }
        };

        fetchAuction();
    }, [auctionId]);

    useEffect(() => {
        const fetchBids = async () => {
            setIsBidsLoading(true);

            try {
                const response = await axiosAuthInstance.get(
                    `/auctions/${auctionId}/bids`,
                    {
                        params: {
                            page: 1,
                            limit: 10,
                        }
                    }
                );

                setBids(response.data.data);
                setBidPage(response.data.page);
                setHasMoreBids(response.data.hasMore);
            } catch (error) {
                showErrorToast(
                    error.response?.data?.message ||
                    "Failed to fetch bid history."
                );
            } finally {
                setIsBidsLoading(false);
            }
        };

        fetchBids();
    }, [auctionId]);

    const loadMoreBids = async () => {
        if (isBidsLoading || !hasMoreBids) {
            return;
        }

        setIsBidsLoading(true);

        try {
            const nextPage = bidPage + 1;

            const response =
                await axiosAuthInstance.get(
                    `/auctions/${auctionId}/bids`,
                    {
                        params: {
                            page: nextPage,
                            limit: 10,
                        },
                    }
                );

            setBids((previousBids) => [
                ...previousBids,
                ...response.data.data,
            ]);

            setBidPage(response.data.page);
            setHasMoreBids(response.data.hasMore);
        } catch (error) {
            showErrorToast(
                error.response?.data?.message ||
                "Failed to load more bids."
            );
        } finally {
            setIsBidsLoading(false);
        }
    };

    return (
        <div className="
            mx-auto
            max-w-7xl
            py-8">

            <div className="
                grid
                gap-8
                lg:grid-cols-[2fr_1fr]">

                <AuctionDetailsCard
                    auction={auction}
                    setAuction={setAuction}
                    isLoading={isAuctionLoading}
                    isAuctionOwner={isAuctionOwner}
                />

                <BidHistory
                    bids={bids}
                    isLoading={isBidsLoading}
                    hasMore={hasMoreBids}
                    onLoadMore={loadMoreBids}
                />
            </div>
        </div>
    );
}