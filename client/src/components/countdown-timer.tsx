import { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

interface CountdownTimerProps {
  targetDate?: Date;
  className?: string;
}

export function CountdownTimer({ 
  targetDate = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
  className = "" 
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalHours: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        const totalHours = days * 24 + hours;

        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
          totalHours
        });
      } else {
        clearInterval(timer);
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalHours: 0
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`countdown-timer ${className}`}>
      <div className="bg-gradient-to-r from-red-900/20 to-black border border-red-500/50 rounded-lg p-6">
        <div className="flex items-center justify-center mb-4">
          <Clock className="w-5 h-5 text-red-400 mr-2" />
          <h3 className="text-lg font-bold text-red-400">BETA LAUNCH COUNTDOWN</h3>
          <Zap className="w-5 h-5 text-red-400 ml-2" />
        </div>
        
        <div className="text-center mb-2">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">T-Minus</div>
          <div className="text-5xl md:text-6xl font-mono font-bold text-white">
            {String(timeRemaining.totalHours).padStart(3, '0')}:
            {String(timeRemaining.minutes).padStart(2, '0')}:
            {String(timeRemaining.seconds).padStart(2, '0')}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center mt-4">
          <div>
            <div className="text-2xl font-bold text-red-400">{timeRemaining.totalHours}</div>
            <div className="text-xs text-gray-500 uppercase">Hours</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400">{timeRemaining.minutes}</div>
            <div className="text-xs text-gray-500 uppercase">Minutes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">{timeRemaining.seconds}</div>
            <div className="text-xs text-gray-500 uppercase">Seconds</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-yellow-400 animate-pulse">
            ⚡ Beta Access Opens Soon • Limited Spots Available ⚡
          </p>
        </div>
      </div>
    </div>
  );
}