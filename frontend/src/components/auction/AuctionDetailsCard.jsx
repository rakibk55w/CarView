import { Link } from "react-router-dom";

import AuctionPriceCard from "./AuctionPriceCard";
import AuctionStatusBadge from "./AuctionStatusBadge";
import CountdownTimer from "../common/CountdownTimer";

import { formStyle } from "../../utils/formStyle";

export default function AuctionDetailsCard({
    auction,
}) {
    const highestBidder = auction.highest_bidder;

    return (
        <section className={formStyle}>

            <div className="
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
                    to={`/cars/${auction.car.id}`}>
                    {auction.car.title}
                </Link>

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
                        to={`/profile/${auction.owner.id}`}>
                        {auction.owner.name}
                    </Link>

                </p>
            </div>

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
                        {auction.created_at}
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
                        {auction.start_time}
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
                        {auction.end_time}
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

                    {highestBidder ? (
                        <Link className="
                            mt-1
                            inline-block
                            font-medium
                            text-primary-600
                            hover:underline
                            dark:text-primary-400"
                            to={`/profile/${highestBidder.id}`}>
                            {highestBidder.name}
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
                    endTime={auction.end_time}
                />
            </div>

        </section>
    );
}