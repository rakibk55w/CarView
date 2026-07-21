import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

const PLACEHOLDER_IMAGE = "https://placehold.co/1200x800?text=No+Image";

export default function CarPictureCarousel({
    title,
    images = [],
    onImageClick,
}) {
    const imageList = images.length > 0
        ? images
        : [PLACEHOLDER_IMAGE];

    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
    });

    const scrollPrevious = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index) => {
        emblaApi?.scrollTo(index);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

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

    function handleImageClick(image) {
        onImageClick?.(image);
    }

    return (
        <div className="
            relative
            w-full
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-gray-100
            dark:border-gray-700
            dark:bg-gray-900">

            <div
                className="overflow-hidden"
                ref={emblaRef}>

                <div className="flex">
                    {imageList.map((image, index) => (
                        <div className="
                            min-w-0
                            flex-[0_0_100%]"
                            key={`${image}-${index}`}>

                            <img className="
                                aspect-4/3
                                h-full
                                w-full
                                cursor-pointer
                                object-cover
                                select-none"
                                src={image}
                                alt={`${title} - Image ${index + 1}`}
                                loading="lazy"
                                draggable={false}
                                onClick={() =>
                                    handleImageClick(image)
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            {imageList.length > 1 && (
                <>
                    <button className="
                        absolute
                        left-3
                        top-1/2
                        flex
                        h-10
                        w-10
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-black/50
                        text-white
                        transition
                        hover:bg-black/70
                        active:scale-95"
                        type="button"
                        aria-label="Previous image"
                        onClick={scrollPrevious}>

                        <FiChevronLeft
                            size={24}
                        />
                    </button>

                    <button className="
                        absolute
                        right-3
                        top-1/2
                        flex
                        h-10
                        w-10
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-black/50
                        text-white
                        transition
                        hover:bg-black/70
                        active:scale-95"
                        type="button"
                        aria-label="Next image"
                        onClick={scrollNext}>

                        <FiChevronRight
                            size={24}
                        />
                    </button>
                </>
            )}

            {imageList.length > 1 && (
                <div className="
                    absolute
                    bottom-3
                    left-1/2
                    flex
                    -translate-x-1/2
                    gap-2">

                    {imageList.map((image, index) => (
                        <button
                            className={`
                                h-2.5
                                w-2.5
                                rounded-full
                                transition-all
                                duration-200
                                ${
                                    selectedIndex === index
                                        ? "scale-110 bg-white"
                                        : "bg-white/40 hover:bg-white/70"
                                }`}
                            key={`${image}-indicator-${index}`}
                            type="button"
                            aria-label={`Go to image ${index + 1}`}
                            aria-current={
                                selectedIndex === index
                                    ? "true"
                                    : undefined
                            }
                            onClick={() =>
                                scrollTo(index)
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
}