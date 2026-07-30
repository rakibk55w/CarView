export default function BidCardSkeleton() {
    return (
        <article className="
            rounded-xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            dark:border-gray-700
            dark:bg-gray-800">

            <div className="
                h-5
                w-5/6
                animate-pulse
                rounded
                bg-gray-200
                dark:bg-gray-700"
            />

            <div className="
                mt-4
                flex
                justify-end">

                <div className="
                    h-4
                    w-28
                    animate-pulse
                    rounded
                    bg-gray-200
                    dark:bg-gray-700"
                />
            </div>
        </article>
    );
}