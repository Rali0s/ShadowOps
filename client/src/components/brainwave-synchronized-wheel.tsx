import { useState, useEffect } from "react";
import { SacredGeometryWheel } from "./sacred-geometry-wheel";

interface BrainwaveSynchronizedWheelProps {
  className?: string;
  size?: number;
  frequency?: number; // External frequency control
}

export function BrainwaveSynchronizedWheel({ 
  className = "",
  size = 350,
  frequency
}: BrainwaveSynchronizedWheelProps) {
  const [currentFrequency, setCurrentFrequency] = useState(10); // Alpha start
  const [currentBand, setCurrentBand] = useState("Alpha");
  const [intensity, setIntensity] = useState(0.8);

  // Brainwave frequency bands
  const frequencyBands = [
    { name: "Theta", min: 4, max: 8, color: "rgba(100, 20, 20, 0.8)" },
    { name: "Alpha", min: 8, max: 12, color: "rgba(140, 30, 30, 0.8)" },
    { name: "Beta", min: 12, max: 30, color: "rgba(180, 40, 40, 0.8)" },
    { name: "Gamma", min: 30, max: 100, color: "rgba(220, 50, 50, 0.8)" }
  ];

  // Update frequency when external frequency changes
  useEffect(() => {
    if (frequency !== undefined) {
      setCurrentFrequency(frequency);
      
      // Determine band based on frequency
      const band = frequencyBands.find(b => frequency >= b.min && frequency <= b.max) || 
                   { name: frequency > 100 ? "Ultra" : frequency < 4 ? "Delta" : "Custom" };
      setCurrentBand(band.name);
      
      // Adjust intensity based on frequency
      const normalizedIntensity = Math.min(1, Math.max(0, (frequency - 0.5) / 99.5));
      setIntensity(0.4 + normalizedIntensity * 0.6);
    } else {
      // Auto-cycle mode when no external frequency is provided
      const intervalId = setInterval(() => {
        const randomBand = frequencyBands[Math.floor(Math.random() * frequencyBands.length)];
        const randomFreq = randomBand.min + Math.random() * (randomBand.max - randomBand.min);
        
        setCurrentFrequency(randomFreq);
        setCurrentBand(randomBand.name);
        
        const normalizedIntensity = Math.min(1, (randomFreq - 4) / 96);
        setIntensity(0.6 + normalizedIntensity * 0.4);
      }, 8000);

      return () => clearInterval(intervalId);
    }
  }, [frequency]);

  // Speed calculation based on frequency
  const getSpeed = (frequency: number) => {
    // Higher frequencies = faster rotation
    return Math.max(0.5, Math.min(3, frequency / 20));
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Frequency Band Indicator */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center space-x-4 px-6 py-3 bg-terminal-red-dark/20 border border-terminal-red-muted rounded-xl">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-terminal-red-primary rounded-full animate-pulse"></div>
            <span className="text-terminal-red-bright font-mono font-bold text-sm">
              {currentBand.toUpperCase()}
            </span>
          </div>
          <div className="w-px h-4 bg-terminal-red-muted"></div>
          <span className="text-terminal-red-secondary font-mono text-sm">
            {currentFrequency.toFixed(1)} Hz
          </span>
        </div>
      </div>

      {/* Sacred Geometry Wheel */}
      <SacredGeometryWheel
        size={size}
        speed={getSpeed(currentFrequency)}
        brainwaveFrequency={currentFrequency}
        intensity={intensity}
      />

      {/* Frequency Description */}
      <div className="mt-6 text-center max-w-md">
        <p className="text-gray-300 text-sm leading-relaxed">
          {currentBand === "Theta" && "Deep meditative state, creativity, and subconscious processing"}
          {currentBand === "Alpha" && "Relaxed awareness, calm focus, and creative insight"}
          {currentBand === "Beta" && "Alert thinking, problem-solving, and active concentration"}
          {currentBand === "Gamma" && "Peak cognitive performance, heightened perception, and consciousness"}
        </p>
      </div>

      {/* Quick Access Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {frequencyBands.map((band) => (
          <button
            key={band.name}
            onClick={() => {
              const midFreq = (band.min + band.max) / 2;
              setCurrentFrequency(midFreq);
              setCurrentBand(band.name);
              setIntensity(0.6 + (midFreq - 4) / 96 * 0.4);
            }}
            className={`px-3 py-1 rounded-lg font-mono text-xs transition-all ${
              currentBand === band.name
                ? 'bg-terminal-red-primary text-white'
                : 'bg-terminal-red-dark/30 text-terminal-red-secondary hover:bg-terminal-red-primary/50'
            }`}
          >
            {band.name}
          </button>
        ))}
      </div>
    </div>
  );
}