import { useState, useEffect } from 'react';
import { Clock, Zap, AlertTriangle, Lock } from 'lucide-react';
import { ShowAbove, ShowBelow } from '@/hooks/use-responsive';
import { useAuth } from '@/hooks/use-auth';

interface CountdownTimerProps {
  targetDate?: Date;
  className?: string;
  onComplete?: () => void;
  onExpired?: () => void;
}

export function CountdownTimer({ 
  targetDate,
  className = "",
  onComplete,
  onExpired
}: CountdownTimerProps) {
  const { betaStatus, user } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalHours: 0
  });
  const [hasTriggeredCallbacks, setHasTriggeredCallbacks] = useState(false);

  // Use server-side beta end date if available, otherwise use provided targetDate or fallback
  const effectiveTargetDate = betaStatus?.endsAt 
    ? new Date(betaStatus.endsAt)
    : targetDate || new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    // If beta is already expired, trigger callbacks immediately
    if (betaStatus?.expired && !hasTriggeredCallbacks) {
      setHasTriggeredCallbacks(true);
      onExpired?.();
      return;
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = effectiveTargetDate.getTime();
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
        
        // Trigger callbacks when timer reaches zero
        if (!hasTriggeredCallbacks) {
          setHasTriggeredCallbacks(true);
          onComplete?.();
          
          // If user is Discord verified, trigger expired callback for subscription redirect
          if (user?.discordVerified) {
            onExpired?.();
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [effectiveTargetDate, betaStatus?.expired, hasTriggeredCallbacks, onComplete, onExpired, user?.discordVerified]);

  // Check if beta is expired or timer has reached zero
  const isExpired = betaStatus?.expired || timeRemaining.totalHours === 0;

  return (
    <div className={`countdown-timer ${className}`} data-testid="countdown-timer">
      <div className={`bg-gradient-to-r ${isExpired ? 'from-orange-900/20 to-red-900/20' : 'from-red-900/20 to-black'} border ${isExpired ? 'border-orange-500/50' : 'border-red-500/50'} rounded-lg p-3 sm:p-6`}>
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          {isExpired ? (
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mr-1 sm:mr-2" />
          ) : (
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-1 sm:mr-2" />
          )}
          <h3 className={`text-sm sm:text-base md:text-lg font-bold ${isExpired ? 'text-orange-400' : 'text-red-400'}`}>
            {isExpired ? (
              <>
                <ShowAbove breakpoint="sm">BETA PERIOD ENDED</ShowAbove>
                <ShowBelow breakpoint="sm">BETA ENDED</ShowBelow>
              </>
            ) : (
              <>
                <ShowAbove breakpoint="sm">BETA LAUNCH COUNTDOWN</ShowAbove>
                <ShowBelow breakpoint="sm">LAUNCH COUNTDOWN</ShowBelow>
              </>
            )}
          </h3>
          {isExpired ? (
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 ml-1 sm:ml-2" />
          ) : (
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 ml-1 sm:ml-2" />
          )}
        </div>
        
        <div className="text-center mb-2">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            {isExpired ? "Beta Access" : "T-Minus"}
          </div>
          <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-mono font-bold ${isExpired ? 'text-orange-400' : 'text-white'} leading-tight`}>
            {isExpired ? (
              <>
                <ShowAbove breakpoint="sm">EXPIRED</ShowAbove>
                <ShowBelow breakpoint="sm">EXPIRED</ShowBelow>
              </>
            ) : (
              <>
                <ShowAbove breakpoint="sm">{String(timeRemaining.totalHours).padStart(3, '0')}:{String(timeRemaining.minutes).padStart(2, '0')}:{String(timeRemaining.seconds).padStart(2, '0')}</ShowAbove>
                <ShowBelow breakpoint="sm">{String(timeRemaining.totalHours).padStart(2, '0')}:{String(timeRemaining.minutes).padStart(2, '0')}:{String(timeRemaining.seconds).padStart(2, '0')}</ShowBelow>
              </>
            )}
          </div>
        </div>
        
        {!isExpired && (
          <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center mt-3 sm:mt-4">
            <div>
              <div className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-red-400">{timeRemaining.totalHours}</div>
              <div className="text-xs text-gray-500 uppercase">Hours</div>
            </div>
            <div>
              <div className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-cyan-400">{timeRemaining.minutes}</div>
              <div className="text-xs text-gray-500 uppercase">
                <ShowAbove breakpoint="sm">Minutes</ShowAbove>
                <ShowBelow breakpoint="sm">Min</ShowBelow>
              </div>
            </div>
            <div>
              <div className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-green-400">{timeRemaining.seconds}</div>
              <div className="text-xs text-gray-500 uppercase">
                <ShowAbove breakpoint="sm">Seconds</ShowAbove>
                <ShowBelow breakpoint="sm">Sec</ShowBelow>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 sm:mt-4 text-center">
          <p className={`text-xs ${isExpired ? 'text-orange-400' : 'text-yellow-400'} ${isExpired ? 'animate-none' : 'animate-pulse'} px-2`} data-testid="countdown-message">
            {isExpired ? (
              user?.discordVerified ? (
                <>
                  <ShowAbove breakpoint="sm">🔒 Beta Ended • Subscribe to Continue Access 🔒</ShowAbove>
                  <ShowBelow breakpoint="sm">🔒 Subscribe to Continue 🔒</ShowBelow>
                </>
              ) : (
                <>
                  <ShowAbove breakpoint="sm">🔒 Beta Ended • Join Discord & Subscribe 🔒</ShowAbove>
                  <ShowBelow breakpoint="sm">🔒 Beta Ended 🔒</ShowBelow>
                </>
              )
            ) : (
              <>
                <ShowAbove breakpoint="sm">⚡ Beta Access Opens Soon • Limited Spots Available ⚡</ShowAbove>
                <ShowBelow breakpoint="sm">⚡ Beta Opens Soon ⚡</ShowBelow>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}