interface FrequencyLogoProps {
  size?: number;
  className?: string;
}

export function FrequencyLogo({ size = 64, className = "" }: FrequencyLogoProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Outer Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          stroke="#ef4444" 
          strokeWidth="3" 
          fill="none"
          className="animate-pulse"
        />
        
        {/* Inner frequency wave pattern */}
        <g transform="translate(50, 50)">
          {/* Central high frequency spike */}
          <path 
            d="M 0 -25 L 3 -15 L 0 -5 L -3 -15 Z" 
            fill="#dc2626" 
            className="animate-pulse"
          />
          <path 
            d="M 0 5 L 3 15 L 0 25 L -3 15 Z" 
            fill="#dc2626"
            className="animate-pulse"
          />
          
          {/* Left side waves */}
          <path 
            d="M -8 -20 L -5 -10 L -8 0 L -11 -10 Z" 
            fill="#b91c1c"
          />
          <path 
            d="M -8 0 L -5 10 L -8 20 L -11 10 Z" 
            fill="#b91c1c"
          />
          
          <path 
            d="M -16 -15 L -13 -8 L -16 -1 L -19 -8 Z" 
            fill="#991b1b"
          />
          <path 
            d="M -16 1 L -13 8 L -16 15 L -19 8 Z" 
            fill="#991b1b"
          />
          
          <path 
            d="M -24 -12 L -21 -6 L -24 0 L -27 -6 Z" 
            fill="#7f1d1d"
          />
          <path 
            d="M -24 0 L -21 6 L -24 12 L -27 6 Z" 
            fill="#7f1d1d"
          />
          
          {/* Right side waves */}
          <path 
            d="M 8 -20 L 11 -10 L 8 0 L 5 -10 Z" 
            fill="#b91c1c"
          />
          <path 
            d="M 8 0 L 11 10 L 8 20 L 5 10 Z" 
            fill="#b91c1c"
          />
          
          <path 
            d="M 16 -15 L 19 -8 L 16 -1 L 13 -8 Z" 
            fill="#991b1b"
          />
          <path 
            d="M 16 1 L 19 8 L 16 15 L 13 8 Z" 
            fill="#991b1b"
          />
          
          <path 
            d="M 24 -12 L 27 -6 L 24 0 L 21 -6 Z" 
            fill="#7f1d1d"
          />
          <path 
            d="M 24 0 L 27 6 L 24 12 L 21 6 Z" 
            fill="#7f1d1d"
          />
        </g>
        
        {/* Horizontal connecting lines */}
        <line 
          x1="15" 
          y1="50" 
          x2="35" 
          y2="50" 
          stroke="#ef4444" 
          strokeWidth="2"
        />
        <line 
          x1="65" 
          y1="50" 
          x2="85" 
          y2="50" 
          stroke="#ef4444" 
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}