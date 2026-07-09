import AuctionCarousel from "./AuctionCarousel";
import AuctionPriceCard from "./AuctionPriceCard";
import AuctionStatusBadge from "./AuctionStatusBadge";
import CountdownTimer from "../common/CountdownTimer";

export default function AuctionCard({
    auction,
    onClick,
}) {
    const {
        id,
        title,
        description,
        brand,
        model,
        manufactureYear,
        status,
        basePrice,
        currentHighestBid,
        endTime,
        images,
    } = auction;

    return (
        <article
            onClick={() => onClick?.(id)}
            className="
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
                dark:hover:border-primary-700
            "
        >
            <div
                className="
                    flex
                    flex-col

                    lg:flex-row
                "
            >
                <AuctionCarousel
                    title={title}
                    images={images}
                />

                <section
                    className="
                        flex
                        flex-1
                        flex-col
                        gap-4

                        p-5
                    "
                >
                    {/* Header */}

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-4
                        "
                    >
                        <h2
                            className="
                                flex-1

                                truncate

                                text-xl
                                font-semibold

                                text-gray-900

                                dark:text-white
                            "
                        >
                            {title}
                        </h2>

                        <AuctionStatusBadge
                            status={status}
                        />
                    </div>

                    {/* Description */}

                    <p
                        className="
                            line-clamp-3

                            text-sm
                            leading-6

                            text-gray-600

                            dark:text-gray-300
                        "
                    >
                        {description}
                    </p>

                    {/* Vehicle Details */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-y-2

                            text-sm

                            sm:grid-cols-2
                        "
                    >
                        <InfoRow
                            label="Brand"
                            value={brand}
                        />

                        <InfoRow
                            label="Model"
                            value={model}
                        />

                        <InfoRow
                            label="Manufacture Year"
                            value={
                                manufactureYear
                            }
                        />
                    </div>

                    {/* Footer */}

                    <div
                        className="
                            mt-auto

                            flex
                            flex-col
                            gap-4

                            lg:flex-row
                            lg:items-end
                            lg:justify-between
                        "
                    >
                        <div
                            className="
                                grid
                                flex-1

                                grid-cols-1
                                gap-3

                                sm:grid-cols-2
                            "
                        >
                            <AuctionPriceCard
                                title="Base Price"
                                value={basePrice}
                            />

                            <AuctionPriceCard
                                title="Highest Bid"
                                value={
                                    currentHighestBid
                                }
                                color="success"
                            />
                        </div>

                        <CountdownTimer
                            endTime={endTime}
                        />
                    </div>
                </section>
            </div>
        </article>
    );
}

function InfoRow({
    label,
    value,
}) {
    return (
        <div
            className="
                flex
                gap-2
            "
        >
            <span
                className="
                    w-32

                    font-semibold

                    text-gray-800

                    dark:text-gray-200
                "
            >
                {label}
            </span>

            <span
                className="
                    text-gray-700

                    dark:text-gray-300
                "
            >
                {value}
            </span>
        </div>
    );
}