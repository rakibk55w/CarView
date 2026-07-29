export default function AuctionCardSkeleton() {
    return (
        <div className="
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            shadow-md
            dark:border-gray-700
            dark:bg-gray-800">

            <div className="
                flex
                flex-col
                lg:flex-row">

                <div className="
                    h-64
                    w-full
                    shrink-0
                    animate-pulse
                    bg-gray-200
                    lg:h-auto
                    lg:min-h-80
                    lg:w-96
                    dark:bg-gray-700"
                />

                <div className="
                    flex
                    flex-1
                    flex-col
                    gap-4
                    p-5">

                    <div className="
                        flex
                        items-center
                        justify-between
                        gap-4">

                        <div className="
                            h-6
                            w-2/3
                            animate-pulse
                            rounded
                            bg-gray-200
                            dark:bg-gray-700"
                        />

                        <div className="
                            h-7
                            w-20
                            animate-pulse
                            rounded-full
                            bg-gray-200
                            dark:bg-gray-700"
                        />
                    </div>

                    <div className="
                        space-y-2">

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
                            w-full
                            animate-pulse
                            rounded
                            bg-gray-200
                            dark:bg-gray-700"
                        />

                        <div className="
                            h-4
                            w-3/4
                            animate-pulse
                            rounded
                            bg-gray-200
                            dark:bg-gray-700"
                        />

                    </div>

                    <div className="
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2">

                        <div className="
                            h-5
                            animate-pulse
                            rounded
                            bg-gray-200
                            dark:bg-gray-700"
                        />

                        <div className="
                            h-5
                            animate-pulse
                            rounded
                            bg-gray-200
                            dark:bg-gray-700"
                        />

                        <div className="
                            h-5
                            animate-pulse
                            rounded
                            bg-gray-200
                            dark:bg-gray-700"
                        />

                    </div>

                    <div className="
                        mt-auto
                        flex
                        flex-col
                        gap-4
                        lg:flex-row">

                        <div className="
                            grid
                            flex-1
                            grid-cols-1
                            gap-3
                            sm:grid-cols-2">

                            <div className="
                                h-20
                                animate-pulse
                                rounded-lg
                                bg-gray-200
                                dark:bg-gray-700"
                            />

                            <div className="
                                h-20
                                animate-pulse
                                rounded-lg
                                bg-gray-200
                                dark:bg-gray-700"
                            />

                        </div>

                        <div className="
                            h-20
                            animate-pulse
                            rounded-lg
                            bg-gray-200
                            lg:w-45
                            dark:bg-gray-700"
                        />

                    </div>

                </div>
            </div>
        </div>
    );
}