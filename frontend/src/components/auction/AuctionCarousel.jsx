import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

const PLACEHOLDER_IMAGE =
    "https://placehold.co/1200x800?text=No+Image";

export default function AuctionCarousel({
    title,
    images = [],
}) {
    const imageList =
        images.length > 0
            ? images
            : [PLACEHOLDER_IMAGE];

    const [selectedIndex, setSelectedIndex] =
        useState(0);

    const [emblaRef, emblaApi] =
        useEmblaCarousel({
            loop: true,
            align: "start",
        });

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index) => {
            emblaApi?.scrollTo(index);
        },
        [emblaApi]
    );

    /**
     * React 19 friendly.
     *
     * We never call setState directly from
     * the effect body.
     */
    useEffect(() => {
        if (!emblaApi) return;

        const updateSelectedIndex = () => {
            setSelectedIndex(
                emblaApi.selectedScrollSnap()
            );
        };

        requestAnimationFrame(
            updateSelectedIndex
        );

        emblaApi.on(
            "select",
            updateSelectedIndex
        );

        emblaApi.on(
            "reInit",
            updateSelectedIndex
        );

        return () => {
            emblaApi.off(
                "select",
                updateSelectedIndex
            );

            emblaApi.off(
                "reInit",
                updateSelectedIndex
            );
        };
    }, [emblaApi]);

    return (
        <div
            className="
                relative

                w-full

                lg:w-95
                xl:w-105
            "
        >
            <div
                ref={emblaRef}
                className="
                    overflow-hidden

                    aspect-16/10
                "
            >
                <div className="flex h-full">
                    {imageList.map(
                        (
                            image,
                            index
                        ) => (
                            <div
                                key={index}
                                className="
                                    min-w-0

                                    flex-[0_0_100%]
                                "
                            >
                                <img
                                    src={image}
                                    alt={`${title} ${
                                        index + 1
                                    }`}
                                    loading="lazy"
                                    draggable={
                                        false
                                    }
                                    className="
                                        h-full
                                        w-full

                                        object-contain

                                        bg-black/5

                                        dark:bg-black/20

                                        select-none
                                    "
                                />
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* left */}

            <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous image"
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

                    transition-all

                    duration-200

                    hover:bg-black/50
                    hover:opacity-100

                    active:scale-95
                "
            >
                <FiChevronLeft
                    size={20}
                />
            </button>

            {/* right */}

            <button
                type="button"
                onClick={scrollNext}
                aria-label="Next image"
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

                    transition-all

                    duration-200

                    hover:bg-black/50
                    hover:opacity-100

                    active:scale-95
                "
            >
                <FiChevronRight
                    size={20}
                />
            </button>

            {/* dots */}

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
                            onClick={() =>
                                scrollTo(
                                    index
                                )
                            }
                            aria-label={`Go to image ${
                                index + 1
                            }`}
                            className={`
                                h-2.5
                                w-2.5

                                rounded-full

                                transition-all

                                ${
                                    selectedIndex ===
                                    index
                                        ? "bg-white scale-110"
                                        : "bg-white/40 hover:bg-white/70"
                                }
                            `}
                        />
                    )
                )}
            </div>
        </div>
    );
}