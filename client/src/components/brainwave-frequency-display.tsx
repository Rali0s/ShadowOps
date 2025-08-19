import { useState, useEffect } from "react";

interface FrequencyBand {
  name: string;
  range: string;
  frequency: string;
  state: string;
  effects: string;
  color: string;
}

const frequencyBands: FrequencyBand[] = [
  {
    name: "Alpha",
    range: "8-12 Hz",
    frequency: "≈8–12",
    state: "Relaxed wakefulness",
    effects: "Calm, alert relaxation; creativity/visualization; sensory gating",
    color: "#ef4444"
  },
  {
    name: "Beta",
    range: "12-30 Hz", 
    frequency: "≈12–30",
    state: "Alert, analytical, task engagement",
    effects: "Executive processing, language, vigilance; sustained attention",
    color: "#dc2626"
  },
  {
    name: "Theta",
    range: "4-8 Hz",
    frequency: "≈4–8", 
    state: "Drowsy/deep relaxation; hypnagogic states",
    effects: "Memory encoding/consolidation; creativity; emotional processing",
    color: "#b91c1c"
  },
  {
    name: "Gamma",
    range: "30-100+ Hz",
    frequency: "≈30–100+",
    state: "Integrative, high-order cognition",
    effects: "Perceptual binding, working memory, insight, heightened focus",
    color: "#991b1b"
  }
];

interface BrainwaveFrequencyDisplayProps {
  activeFrequency?: string;
  className?: string;
}

export function BrainwaveFrequencyDisplay({ 
  activeFrequency = "Alpha", 
  className = "" 
}: BrainwaveFrequencyDisplayProps) {
  const [currentBand, setCurrentBand] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setCurrentBand((prev) => (prev + 1) % frequencyBands.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  const activeBand = frequencyBands.find(band => band.name === activeFrequency) || frequencyBands[currentBand];

  return (
    <div className={`bg-terminal-bg border border-terminal-red-primary rounded-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-terminal-red-bright font-mono mb-2">
          _Fq Brainwave Analysis
        </h3>
        <p className="text-gray-400 text-sm">
          Neural frequency monitoring and optimization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {frequencyBands.map((band, index) => (
          <div 
            key={band.name}
            className={`bg-gray-800 rounded-lg p-4 border-2 transition-all duration-300 cursor-pointer ${
              band.name === activeBand.name 
                ? 'border-terminal-red-primary bg-gray-700' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onClick={() => {
              setIsAnimating(false);
              setCurrentBand(index);
            }}
            data-testid={`frequency-band-${band.name.toLowerCase()}`}
          >
            <div className="text-center">
              <div 
                className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ backgroundColor: band.color }}
              >
                <span className="text-white text-xs font-bold">
                  {band.name.charAt(0)}
                </span>
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">
                {band.name}
              </h4>
              <p className="text-gray-400 text-xs">
                {band.range}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-terminal-red-bright font-bold text-lg font-mono">
            {activeBand.name} Wave
          </h4>
          <span className="text-terminal-red-secondary font-mono text-sm">
            {activeBand.frequency} Hz
          </span>
        </div>
        
        <div className="space-y-3">
          <div>
            <span className="text-gray-400 text-sm font-semibold">State:</span>
            <p className="text-white text-sm mt-1">{activeBand.state}</p>
          </div>
          
          <div>
            <span className="text-gray-400 text-sm font-semibold">Effects:</span>
            <p className="text-white text-sm mt-1">{activeBand.effects}</p>
          </div>
        </div>

        {/* Frequency wave visualization */}
        <div className="mt-4 h-16 bg-gray-900 rounded border border-gray-700 flex items-center justify-center overflow-hidden">
          <svg 
            width="100%" 
            height="60" 
            viewBox="0 0 400 60" 
            className="text-terminal-red-primary"
          >
            <path 
              d={`M 0 30 ${Array.from({length: 20}, (_, i) => {
                const x = i * 20;
                const frequency = parseFloat(activeBand.frequency.split('–')[0]) || 10;
                const amplitude = 15;
                const y = 30 + amplitude * Math.sin((x / 400) * frequency * Math.PI * 2);
                return `L ${x} ${y}`;
              }).join(' ')}`}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className={`px-4 py-2 rounded font-mono text-sm transition-colors ${
            isAnimating 
              ? 'bg-terminal-red-primary text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          data-testid="toggle-animation"
        >
          {isAnimating ? 'Pause Cycle' : 'Auto Cycle'}
        </button>
      </div>
    </div>
  );
}