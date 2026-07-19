const PLACEHOLDER_IMAGE = "https://placehold.co/600x600?text=No+Image";

export default function CarCard({
    car,
    onClick = () => {},
}) {
    return (
        <button className="
            flex
            w-full
            max-w-4xl
            cursor-pointer
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            text-left
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-md
            dark:border-gray-700
            dark:bg-gray-800"
            type="button"
            onClick={onClick}>
            <img className="
                h-28
                w-28
                shrink-0
                object-cover
                sm:h-32
                sm:w-32
                md:h-40
                md:w-40"
                src={car.image || PLACEHOLDER_IMAGE}
                alt={car.title}
            />

            <div className="
                flex
                min-w-0
                flex-1
                flex-col
                justify-center
                gap-2
                p-4">
                <h2 className="
                    truncate
                    text-base
                    font-semibold
                    text-gray-900
                    md:text-lg
                    dark:text-white">
                    {car.title}
                </h2>

                <p className="
                    line-clamp-2
                    sm:line-clamp-3
                    text-sm
                    text-gray-600
                    md:text-base
                    dark:text-gray-300">
                    {car.description}
                </p>
            </div>
        </button>
    );
}