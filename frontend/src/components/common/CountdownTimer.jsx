import { FiClock } from "react-icons/fi";
import useCountdown from "../../hooks/useCountdown";

export default function CountdownTimer({endTime}) {
    const timeLeft = useCountdown(endTime);

    if (timeLeft.expired) {
        return (
            <div className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-red-300
                bg-red-50
                px-4
                py-3
                dark:border-red-800
                dark:bg-red-950">

                <FiClock className="
                    text-red-500"
                    size={22}
                />

                <div>
                    <p className="
                        text-xs
                        uppercase
                        tracking-wide
                        text-red-500">
                        Auction Ended
                    </p>

                    <p className="
                        font-mono
                        text-lg
                        font-bold
                        text-red-500">
                        00:00:00
                    </p>
                </div>
            </div>
        );
    }

    const formattedTime = timeLeft.days > 0
        ? `${timeLeft.days}d ${timeLeft.hours}h`
        : `${String(timeLeft.hours).padStart(2, "0")}
            :${String(timeLeft.minutes).padStart(2, "0")}
            :${String(timeLeft.seconds).padStart(2, "0")}`;

    return (
        <div className="
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
            dark:bg-gray-900">

            <FiClock className="
                text-primary-600
                dark:text-primary-400"
                size={24}
            />

            <div>
                <p className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-gray-500
                    dark:text-gray-400">
                    Remaining
                </p>

                <p className="
                    font-mono
                    text-lg
                    font-bold
                    text-primary-700
                    dark:text-primary-300">
                    {formattedTime}
                </p>
            </div>
        </div>
    );
}