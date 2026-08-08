import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import AuctionPriceCard from "./AuctionPriceCard";
import AuctionStatusBadge from "./AuctionStatusBadge";
import CountdownTimer from "../common/CountdownTimer";
import PlaceBidForm from "../bid/PlaceBidForm";
import CustomButton from "../button/CustomButton";
import ConfirmationDialog from "../common/ConfirmationDialog";

import axiosAuthInstance from "../../api/axiosAuthInstance";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { formStyle } from "../../utils/formStyle";
import formatDateForDisplay from "../../utils/formatDateForDisplay";
import formatTimeForDisplay from "../../utils/formatTimeForDisplay";

export default function AuctionDetailsCard({
    auction,
    setAuction,
    isLoading,
    isAuctionOwner
}) {
    const navigate = useNavigate();

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [now, setNow] = useState(Date.now);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleDeleteAuction = async () => {
        setShowDeleteDialog(false);

        try {
            const response = await axiosAuthInstance.delete(
                `/auctions/${auction.id}`
            );

            showSuccessToast(
                response.data.message ||
                "Auction deleted successfully."
            );

            navigate("/");
        } catch (error) {
            showErrorToast(
                error.response?.data?.message ||
                "Failed to delete auction."
            );
        }
    };

    const handleBidSuccess = (newBid) => {
        setAuction((currentAuction) => ({
            ...currentAuction,
            current_highest_bid: newBid,
        }));
    };

    if (isLoading) {
        return (
            <section className={formStyle}>
                <div className="animate-pulse">
                    <div className="
                        border-b
                        border-gray-200
                        pb-6
                        dark:border-gray-700">
                        <div className="
                            h-8
                            w-3/5
                            rounded
                            bg-gray-200
                            dark:bg-gray-700"
                        />

                        <div className="
                            mt-3
                            h-4
                            w-2/5
                            rounded
                            bg-gray-200
                            dark:bg-gray-700"
                        />
                    </div>

                    <div className="
                        mt-6
                        grid
                        gap-6
                        sm:grid-cols-2">

                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index}>
                                <div className="
                                    h-4
                                    w-24
                                    rounded
                                    bg-gray-200
                                    dark:bg-gray-700"
                                />

                                <div className="
                                    mt-2
                                    h-5
                                    w-32
                                    rounded
                                    bg-gray-200
                                    dark:bg-gray-700"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="
                        mt-8
                        grid
                        gap-4
                        sm:grid-cols-2">

                        <div className="
                            h-24
                            rounded
                            bg-gray-200
                            dark:bg-gray-700"
                        />

                        <div className="
                            h-24
                            rounded
                            bg-gray-200
                            dark:bg-gray-700"
                        />

                    </div>

                    <div className="
                        mt-4
                        h-12
                        rounded
                        bg-gray-200
                        dark:bg-gray-700"
                    />
                </div>
            </section>
        );
    }

    if (!auction) {
        return null;
    }

    const auctionHasNotStarted = new Date(auction.start_time).getTime() > now;

    return (
        <section className={formStyle}>

            <div className="
                flex
                items-center
                justify-between
                gap-4
                border-b
                border-gray-200
                pb-6
                dark:border-gray-700">

                <Link className="
                    text-2xl
                    font-semibold
                    text-primary-600
                    transition-colors
                    hover:text-primary-700
                    hover:underline
                    dark:primary-400
                    dark:hover:text-primary-300"
                    to={`/cars/${auction.car_id}`}>

                    {auction.car_title}
                </Link>

                {isAuctionOwner && auctionHasNotStarted && (
                    <CustomButton className="
                        w-auto
                        px-4"
                        dangerButton={true}
                        icon={<FaTrash />}
                        onClick={() => setShowDeleteDialog(true)}>

                        Delete Auction
                    </CustomButton>
                )}

                </div>

                <p className="
                    mt-2
                    text-sm
                    text-gray-600
                    dark:text-gray-400">

                    Auction created by{" "}

                    <Link className="
                        font-medium
                        text-primary-600
                        transition-colors
                        hover:text-primary-700
                        hover:underline
                        dark:text-primary-400
                        dark:hover:text-primary-300"
                        to={`/profile/${auction.owner_id}`}>

                        {auction.owner_name}
                    </Link>
                </p>

            <div className="
                mt-6
                grid
                gap-6
                sm:grid-cols-2">

                <div>
                    <p className="
                        text-sm
                        font-medium
                        text-gray-500
                        dark:text-gray-400">
                        Created At
                    </p>

                    <p className="mt-1">
                        {formatDateForDisplay(auction.created_at)}
                            {" • "}
                        {formatTimeForDisplay(auction.created_at)}
                    </p>
                </div>

                <div>
                    <p className="
                        text-sm
                        font-medium
                        text-gray-500
                        dark:text-gray-400">
                        Status
                    </p>

                    <div className="mt-2">
                        <AuctionStatusBadge
                            status={auction.status}
                        />
                    </div>
                </div>
                
                <div>
                    <p className="
                        text-sm
                        font-medium
                        text-gray-500
                        dark:text-gray-400">
                        Start Time
                    </p>

                    <p className="mt-1">
                        {formatDateForDisplay(auction.start_time)}
                            {" • "}
                        {formatTimeForDisplay(auction.start_time)}
                    </p>
                </div>

                <div>
                    <p className="
                        text-sm
                        font-medium
                        text-gray-500
                        dark:text-gray-400">
                        End Time
                    </p>

                    <p className="mt-1">
                        {formatDateForDisplay(auction.end_time)}
                            {" • "}
                        {formatTimeForDisplay(auction.end_time)}
                    </p>
                </div>


                <div>
                    <p className="
                        text-sm
                        font-medium
                        text-gray-500
                        dark:text-gray-400">
                        Highest Bidder
                    </p>

                    {auction.highest_bidder_id ? (
                        <Link className="
                            mt-1
                            inline-block
                            font-medium
                            text-primary-600
                            hover:underline
                            dark:text-primary-400"
                            to={`/profile/${auction.highest_bidder_id}`}>

                            {auction.highest_bidder_name}
                        </Link>
                    ) : (
                        <p className="
                            mt-1
                            text-gray-600
                            dark:text-gray-300">
                            Pending
                        </p>
                    )}
                </div>

                <div>
                    <p className="
                        text-sm
                        font-medium
                        text-gray-500
                        dark:text-gray-400">
                        Extension Count
                    </p>

                    <p className="mt-1">
                        {auction.extension_count}
                    </p>
                </div>

            </div>

            <div className="
                mt-8
                grid
                gap-4
                sm:grid-cols-2">

                <AuctionPriceCard
                    title="Base Price"
                    value={auction.base_price}
                    color="base"
                />

                <AuctionPriceCard
                    title="Current Highest Bid"
                    value={auction.current_highest_bid}
                    color="bid"
                />

            </div>

            <div className="mt-4">
                <CountdownTimer
                    startTime={auction.start_time}
                    endTime={auction.end_time}
                    now={now}
                />
            </div>

            { !auctionHasNotStarted && 
                <PlaceBidForm
                    auctionId={auction.id}
                    ownerId={auction.owner_id}
                    basePrice={auction.base_price}
                    currentHighestBid={auction.current_highest_bid}
                    onBidSuccess={handleBidSuccess}
                />
            }

            <ConfirmationDialog
                isOpen={showDeleteDialog}
                title="Delete Auction"
                message="Are you sure you want to delete this auction? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onCancel={() => setShowDeleteDialog(false)}
                onConfirm={handleDeleteAuction}
            />
        </section>
    );
}