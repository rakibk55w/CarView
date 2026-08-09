import AuctionCarouselPicture from "./AuctionPictureCarousel";
import AuctionPriceCard from "./AuctionPriceCard";
import AuctionStatusBadge from "./AuctionStatusBadge";
import CountdownTimer from "../common/CountdownTimer";
import AuctionInfoRow from "./AuctionInfoRow";
import PlaceBidForm from "../bid/PlaceBidForm";
import { useState } from "react";

export default function AuctionCard({
    auction,
    now,
    onClick,
}) {
    const {
        id,
        title,
        description,
        brand,
        model,
        fuel_type,
        manufacture_year,
        status,
        owner_id,
        base_price,
        current_highest_bid,
        start_time,
        end_time,
        images
    } = auction;

    const [highestBid, setHighestBid] = useState(current_highest_bid);

    const auctionHasNotStarted = new Date(auction.start_time).getTime() > now;

    return (
        <article className="
            cursor-pointer
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            shadow-md
            transition-all
            duration-300
            hover:border-primary-300
            hover:shadow-xl
            dark:border-gray-700
            dark:bg-gray-800
            dark:hover:border-primary-700"
            onClick={() => onClick?.(id)}>
            <div className="
                flex
                flex-col
                lg:flex-row
                items-stretch">
                <AuctionCarouselPicture
                    title={title}
                    images={images}
                />

                <section className="
                    flex
                    flex-1
                    flex-col
                    gap-4
                    p-5">

                    <div className="
                        grid
                        grid-cols-[1fr_auto]
                        items-start
                        justify-between
                        gap-4">
                        <h2 className="
                            min-w-0
                            flex-1
                            truncate
                            text-xl
                            font-semibold
                            text-gray-900
                            dark:text-white">
                            {title}
                        </h2>
                        <AuctionStatusBadge
                            status={status}
                        />
                    </div>

                    <p className="
                        line-clamp-3
                        text-sm
                        leading-6
                        min-h-18
                        text-gray-600
                        dark:text-gray-300">
                        {description}
                    </p>

                    <div className="
                        grid
                        grid-cols-1
                        gap-y-2
                        text-sm
                        sm:grid-cols-2">
                        <AuctionInfoRow
                            label="Brand"
                            value={brand}
                        />

                        <AuctionInfoRow
                            label="Model"
                            value={model}
                        />

                        <AuctionInfoRow
                            label="Manufacture Year"
                            value={manufacture_year}
                        />

                        <AuctionInfoRow
                            label="Fuel Type"
                            value={fuel_type}
                        />
                    </div>

                    <div className="
                        mt-auto
                        flex
                        flex-col
                        gap-4
                        lg:flex-row
                        lg:items-end
                        lg:justify-between">
                        <div className="
                            grid
                            flex-1
                            grid-cols-1
                            gap-3
                            items-stretch
                            sm:grid-cols-2">
                            <AuctionPriceCard
                                title="Base Price"
                                value={base_price}
                                color="base"
                            />

                            <AuctionPriceCard
                                title="Highest Bid"
                                value={highestBid}
                                color="bid"
                            />
                        </div>

                        <div className="
                            lg:w-45
                            lg:shrink-0">
                            <CountdownTimer
                                startTime={start_time}
                                endTime={end_time}
                                now={now}
                            />
                        </div>


                    </div>
                        
                    { !auctionHasNotStarted && 
                        <PlaceBidForm
                            auctionId={id}
                            ownerId={owner_id}
                            basePrice={base_price}
                            currentHighestBid={highestBid}
                            onBidSuccess={(newBid) => 
                                setHighestBid(newBid)
                            }
                        />
                    }
                        
                </section>
            </div>
        </article>
    );
}