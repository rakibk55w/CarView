import { FiClock } from "react-icons/fi";

export default function CountdownTimer({startTime, endTime, now}) {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    let difference;
    let status;

    if (now < start) {
        difference = start - now;
        status = "starting";
    } else if (now < end) {
        difference = end - now;
        status = "running";
    } else {
        difference = 0;
        status = "expired";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    
    const seconds = Math.floor(
        (difference / 1000) % 60
    );
    
    if (status === "expired") {
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
                        Remaining
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

    const formattedTime = days > 0
        ? `${days}d ${hours}h`
        : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

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
                    
                    {status === "starting"
                        ? "Starting In"
                        : "Remaining"}
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