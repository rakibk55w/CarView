export default function AuctionSearchSkeleton() {
    return (
        <div className="
            flex
            w-full
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-sm
            dark:border-gray-700
            dark:bg-gray-800">

            <div className="
                h-28
                w-28
                shrink-0
                animate-pulse
                bg-gray-200
                sm:h-32
                sm:w-32
                md:h-40
                md:w-40
                dark:bg-gray-700"
            />

            <div className="
                flex
                min-w-0
                flex-1
                flex-col
                justify-center
                gap-3
                p-4">

                <div className="
                    h-5
                    w-3/4
                    animate-pulse
                    rounded
                    bg-gray-200
                    dark:bg-gray-700"
                />

                <div className="
                    h-4
                    w-full
                    animate-pulse
                    rounded
                    bg-gray-200
                    dark:bg-gray-700"
                />

                <div className="
                    h-4
                    w-5/6
                    animate-pulse
                    rounded
                    bg-gray-200
                    dark:bg-gray-700"
                />
            </div>
        </div>
    );
}