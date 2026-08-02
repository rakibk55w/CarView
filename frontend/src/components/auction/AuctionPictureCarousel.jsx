import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FiChevronLeft, FiChevronRight} from "react-icons/fi";

const PLACEHOLDER_IMAGE = "https://placehold.co/1200x800?text=No+Image";

export default function AuctionPictureCarousel({
    title,
    images = []
}) {
    const imageList = images.length > 0
        ? images
        : [PLACEHOLDER_IMAGE];

    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start"
    });

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index) => {
        emblaApi?.scrollTo(index);
    }, [emblaApi]);

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

    const stopPropagation = (event) => { 
        event.stopPropagation(); 
    };

    return (
        <div className="
            relative
            flex
            w-full
            lg:basis-[30%]
            lg:shrink-0
            cursor-default"
            onClick={stopPropagation}
            onPointerDown={stopPropagation}>
            <div className="
                overflow-hidden
                aspect-4/3
                bg-black"
                ref={emblaRef}>
                <div className="
                    flex 
                    h-full">
                    {imageList.map((image, index) => (
                        <div className="
                            flex
                            min-w-0
                            flex-[0_0_100%]"
                            key={index}>
                            <img className="
                                h-full
                                w-full
                                object-cover
                                select-none"
                                src={image}
                                alt={`${title} ${index + 1}`}
                                loading="lazy"
                                draggable={ false }
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button className="
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
                active:scale-95"
                type="button"
                onClick={scrollPrev}
                aria-label="Previous image">
                <FiChevronLeft
                    className="cursor-pointer"
                    size={20}
                />
            </button>

            <button className="
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
                active:scale-95"
                type="button"
                onClick={scrollNext}
                aria-label="Next image">
                <FiChevronRight
                    className="cursor-pointer"
                    size={20}
                />
            </button>

            <div className="
                absolute
                bottom-3
                left-1/2
                flex
                -translate-x-1/2
                gap-2">
                {imageList.map((_, index) => (
                    <button className={`
                        h-2.5
                        w-2.5
                        rounded-full
                        transition-all
                        ${selectedIndex === index
                            ? "bg-white scale-110"
                            : "bg-white/40 hover:bg-white/70"
                        }`}
                        
                        key={index}
                        type="button"
                        onClick={() =>
                            scrollTo(index)
                        }
                        aria-label={`
                            Go to image ${index + 1}
                        `}
                    />
                ))}
            </div>
        </div>
    );
}