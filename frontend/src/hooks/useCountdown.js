import { useEffect, useCallback, useState } from "react";

export default function useCountdown(startTime, endTime) {
  	const calculateTimeLeft = useCallback(() => {
        const now = Date.now();

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

        return {
			status,
            expired: status === "expired",
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
	}, [startTime, endTime]);
  	
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  	useEffect(() => {
    	const interval = setInterval(() => {
      		setTimeLeft(calculateTimeLeft());
    	}, 1000);

    	return () => clearInterval(interval);
  	}, [calculateTimeLeft]);

  	return timeLeft;
}
