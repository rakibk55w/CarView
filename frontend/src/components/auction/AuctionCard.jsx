import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
    FiChevronLeft,
    FiChevronRight,
    FiClock,
} from "react-icons/fi";

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);
}

function calculateRemainingTime(endTime) {
    const difference = new Date(endTime).getTime() - Date.now();

    if (difference <= 0) {
        return {
            expired: true,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    return {
        expired: false,
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
            (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
            (difference / 1000) % 60
        ),
    };
}

function CountdownTimer({ endTime }) {
    const [timeLeft, setTimeLeft] = useState(
        calculateRemainingTime(endTime)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(
                calculateRemainingTime(endTime)
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    if (timeLeft.expired) {
        return (
            <div className="flex flex-col items-end">
                <span
                    className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-wide
                        text-red-500
                    "
                >
                    Auction Ended
                </span>

                <span
                    className="
                        font-mono
                        text-lg
                        font-bold
                        text-red-500
                    "
                >
                    00:00:00
                </span>
            </div>
        );
    }

    const formattedTime =
        timeLeft.days > 0
            ? `${timeLeft.days}d ${String(
                  timeLeft.hours
              ).padStart(2, "0")}h`
            : `${String(
                  timeLeft.hours
              ).padStart(2, "0")}:${String(
                  timeLeft.minutes
              ).padStart(2, "0")}:${String(
                  timeLeft.seconds
              ).padStart(2, "0")}`;

    return (
        <div className="flex flex-col items-end">
            <span
                className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-wide
                    text-gray-500
                    dark:text-gray-400
                "
            >
                Remaining
            </span>

            <span
                className="
                    font-mono
                    text-lg
                    font-bold
                    text-primary-700
                    dark:text-primary-300
                "
            >
                {formattedTime}
            </span>
        </div>
    );
}

export default function AuctionCard({
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
    images = [],
    onClick,
}) {
    const [selectedIndex, setSelectedIndex] =
        useState(0);

    const [emblaRef, emblaApi] =
        useEmblaCarousel({
            loop: true,
        });

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return;

        emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (!emblaApi) return;

        emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;

        setSelectedIndex(
            emblaApi.selectedScrollSnap()
        );
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();

        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    const isActive =
        status?.toLowerCase() === "active";

    const imageList = useMemo(() => {
        if (
            !images ||
            !Array.isArray(images) ||
            images.length === 0
        ) {
            return [
                "https://placehold.co/800x500?text=No+Image",
            ];
        }

        return images;
    }, [images]);

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
                {/* ========================= */}
                {/* CAROUSEL */}
                {/* ========================= */}

                <div
                    className="
                        relative
                        w-full
                        lg:w-[380px]
                        xl:w-[420px]
                    "
                >
                    <div
                        className="
                            overflow-hidden
                            aspect-[16/10]
                        "
                        ref={emblaRef}
                    >
                        <div className="flex h-full">
                            {imageList.map(
                                (image, index) => (
                                    <div
                                        key={index}
                                        className="
                                            min-w-0
                                            flex-[0_0_100%]
                                        "
                                    >
                                        <img
                                            src={image}
                                            alt={`${title} ${index}`}
                                            className="
                                                h-full
                                                w-full
                                                object-contain
                                                bg-black/5
                                                dark:bg-black/20
                                            "
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* PREVIOUS */}

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            scrollPrev();
                        }}
                        className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2

                            flex
                            h-9
                            w-9
                            items-center
                            justify-center

                            rounded-full

                            bg-black/30
                            text-white

                            opacity-60
                            backdrop-blur-sm

                            transition

                            hover:opacity-100
                            hover:bg-black/50
                        "
                    >
                        <FiChevronLeft size={20} />
                    </button>

                    {/* NEXT */}

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            scrollNext();
                        }}
                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2

                            flex
                            h-9
                            w-9
                            items-center
                            justify-center

                            rounded-full

                            bg-black/30
                            text-white

                            opacity-60
                            backdrop-blur-sm

                            transition

                            hover:opacity-100
                            hover:bg-black/50
                        "
                    >
                        <FiChevronRight size={20} />
                    </button>

                    {/* DOTS */}

                    <div
                        className="
                            absolute
                            bottom-3
                            left-1/2
                            flex
                            -translate-x-1/2
                            gap-2
                        "
                    >
                        {imageList.map(
                            (_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        emblaApi?.scrollTo(
                                            index
                                        );
                                    }}
                                    className={`
                                        h-2.5
                                        w-2.5
                                        rounded-full
                                        transition
                                        ${
                                            selectedIndex ===
                                            index
                                                ? "bg-white"
                                                : "bg-white/40"
                                        }
                                    `}
                                />
                            )
                        )}
                    </div>
                </div>

                {/* ========================= */}
                {/* DETAILS */}
                {/* ========================= */}

                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        gap-4
                        p-5
                    "
                >
                    {/* HEADER */}

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

                        <span
                            className={`
                                shrink-0
                                rounded-full
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wide

                                ${
                                    isActive                                    ? `
                                        bg-green-100
                                        text-green-700

                                        dark:bg-green-900
                                        dark:text-green-200
                                    `
                                    : `
                                        bg-danger-100
                                        text-danger-700

                                        dark:bg-danger-900
                                        dark:text-danger-200
                                    `
                                }
                            `}
                        >
                            {isActive ? "Active" : "Closed"}
                        </span>
                    </div>

                    {/* DESCRIPTION */}

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

                    {/* VEHICLE DETAILS */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-y-2

                            text-sm

                            sm:grid-cols-2
                        "
                    >
                        <div className="flex gap-2">
                            <span
                                className="
                                    w-28
                                    font-semibold
                                    text-gray-800
                                    dark:text-gray-200
                                "
                            >
                                Brand
                            </span>

                            <span
                                className="
                                    text-gray-700
                                    dark:text-gray-300
                                "
                            >
                                {brand}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <span
                                className="
                                    w-28
                                    font-semibold
                                    text-gray-800
                                    dark:text-gray-200
                                "
                            >
                                Model
                            </span>

                            <span
                                className="
                                    text-gray-700
                                    dark:text-gray-300
                                "
                            >
                                {model}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <span
                                className="
                                    w-28
                                    font-semibold
                                    text-gray-800
                                    dark:text-gray-200
                                "
                            >
                                Manufacture
                            </span>

                            <span
                                className="
                                    text-gray-700
                                    dark:text-gray-300
                                "
                            >
                                {manufactureYear}
                            </span>
                        </div>
                    </div>

                    {/* PRICE + TIMER */}

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
                        {/* PRICE CARDS */}

                        <div
                            className="
                                grid
                                flex-1
                                grid-cols-1
                                gap-3

                                sm:grid-cols-2
                            "
                        >
                            {/* BASE PRICE */}

                            <div
                                className="
                                    rounded-xl

                                    bg-primary-600

                                    px-4
                                    py-3

                                    text-white

                                    shadow
                                "
                            >
                                <p
                                    className="
                                        text-xs
                                        uppercase
                                        tracking-wide
                                        text-primary-100
                                    "
                                >
                                    Base Price
                                </p>

                                <p
                                    className="
                                        mt-1

                                        text-xl
                                        font-bold
                                    "
                                >
                                    {formatCurrency(basePrice)}
                                </p>
                            </div>

                            {/* CURRENT BID */}

                            <div
                                className="
                                    rounded-xl

                                    bg-green-600

                                    px-4
                                    py-3

                                    text-white

                                    shadow
                                "
                            >
                                <p
                                    className="
                                        text-xs
                                        uppercase
                                        tracking-wide
                                        text-green-100
                                    "
                                >
                                    Highest Bid
                                </p>

                                <p
                                    className="
                                        mt-1

                                        text-xl
                                        font-bold
                                    "
                                >
                                    {formatCurrency(currentHighestBid)}
                                </p>
                            </div>
                        </div>

                        {/* TIMER */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl

                                border
                                border-gray-200

                                bg-white

                                px-4
                                py-3

                                dark:border-gray-700
                                dark:bg-gray-900
                            "
                        >
                            <FiClock
                                size={24}
                                className="
                                    shrink-0

                                    text-primary-600
                                    dark:text-primary-400
                                "
                            />

                            <CountdownTimer
                                endTime={endTime}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}