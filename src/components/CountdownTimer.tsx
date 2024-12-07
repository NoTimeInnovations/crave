import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endTime: Date;
}

export function CountdownTimer({ endTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const distance = end - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0 });
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ hours, minutes });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft.hours === 0 && timeLeft.minutes === 0) {
    return <span className="text-red-600">Expired</span>;
  }

  return (
    <span>
      {timeLeft.hours}h {timeLeft.minutes}m remaining
    </span>
  );
}