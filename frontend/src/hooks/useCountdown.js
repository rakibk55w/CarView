import { useEffect, useState } from "react";

function calculateRemainingTime(endTime) {
  const difference = new Date(endTime).getTime() - Date.now();

  if (difference <= 0) {
    return {
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    expired: false,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function useCountdown(endTime) {
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateRemainingTime(endTime),
  );

  useEffect(() => {

    const interval = setInterval(() => {
      setTimeLeft(calculateRemainingTime(endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
}
