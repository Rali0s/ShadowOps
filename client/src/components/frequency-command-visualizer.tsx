import { useState, useEffect } from "react";
import { SacredGeometryWheel } from "./sacred-geometry-wheel";

interface FrequencyCommandVisualizerProps {
  isVisible: boolean;
  frequency?: number;
  duration?: number;
  onComplete?: () => void;
}

export function FrequencyCommandVisualizer({ 
  isVisible, 
  frequency = 10,
  duration = 5000,
  onComplete 
}: FrequencyCommandVisualizerProps) {
  const [opacity, setOpacity] = useState(0);
  const [currentFreq, setCurrentFreq] = useState(frequency);

  useEffect(() => {
    if (isVisible) {
      // Fade in
      setOpacity(1);
      
      // Frequency sweep effect
      let sweepInterval: NodeJS.Timeout;
      const startFreq = Math.max(4, frequency - 5);
      const endFreq = Math.min(100, frequency + 5);
      let step = 0;
      const steps = 30;
      
      sweepInterval = setInterval(() => {
        const progress = step / steps;
        const sweepFreq = startFreq + (endFreq - startFreq) * Math.sin(progress * Math.PI);
        setCurrentFreq(sweepFreq);
        step++;
        
        if (step >= steps) {
          step = 0;
        }
      }, duration / 60);

      // Auto hide after duration
      const hideTimer = setTimeout(() => {
        setOpacity(0);
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }, duration);

      return () => {
        clearInterval(sweepInterval);
        clearTimeout(hideTimer);
      };
    }
  }, [isVisible, frequency, duration, onComplete]);

  if (!isVisible && opacity === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{
        background: `rgba(0, 0, 0, ${opacity * 0.7})`,
        transition: 'all 0.5s ease-in-out',
        opacity
      }}
    >
      <div className="relative">
        {/* Main wheel */}
        <SacredGeometryWheel
          size={400}
          speed={3}
          brainwaveFrequency={currentFreq}
          intensity={1}
        />
        
        {/* Frequency display */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-black/80 backdrop-blur border border-terminal-red-primary rounded-lg px-6 py-4 text-center">
            <div className="text-terminal-red-bright font-mono text-2xl font-bold">
              {currentFreq.toFixed(1)} Hz
            </div>
            <div className="text-terminal-red-secondary font-mono text-sm mt-1">
              {currentFreq >= 30 ? 'GAMMA' : 
               currentFreq >= 12 ? 'BETA' : 
               currentFreq >= 8 ? 'ALPHA' : 'THETA'}
            </div>
          </div>
        </div>
        
        {/* Warning pulses */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border-2 border-terminal-red-primary rounded-full animate-ping"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Warning text */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="bg-terminal-red-dark/90 border border-terminal-red-primary rounded-lg px-8 py-3">
          <div className="text-terminal-red-bright font-mono text-lg font-bold animate-pulse">
            ⚠ HIGH-SPEED ELLIPTICAL WARNING ⚠
          </div>
          <div className="text-center text-terminal-red-secondary font-mono text-sm mt-1">
            Sacred geometry pattern active - Brainwave synchronization in progress
          </div>
        </div>
      </div>
    </div>
  );
}