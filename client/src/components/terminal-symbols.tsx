import React from 'react';

// SVG Terminal Symbols for accessibility and visual clarity
export const TerminalSymbols = {
  // Status indicators with shapes for color blind accessibility
  Online: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="8" fill="hsl(var(--terminal-red-primary))" />
      <circle cx="12" cy="12" r="4" fill="white" />
      <text x="12" y="16" textAnchor="middle" fontSize="8" fill="black">●</text>
    </svg>
  ),

  Offline: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="4" width="16" height="16" fill="hsl(var(--terminal-red-muted))" />
      <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white">■</text>
    </svg>
  ),

  Warning: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 22,20 2,20" fill="hsl(var(--terminal-amber))" />
      <text x="12" y="17" textAnchor="middle" fontSize="10" fill="black">!</text>
      <text x="12" y="8" textAnchor="middle" fontSize="6" fill="black">▲</text>
    </svg>
  ),

  Error: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,3 21,12 12,21 3,12" fill="hsl(var(--terminal-scarlet))" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fill="white">✖</text>
      <text x="12" y="8" textAnchor="middle" fontSize="6" fill="white">◆</text>
    </svg>
  ),

  Success: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="hsl(var(--terminal-red-secondary))" />
      <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" fill="none" />
      <text x="12" y="20" textAnchor="middle" fontSize="6" fill="white">✓</text>
    </svg>
  ),

  Processing: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="8" fill="none" stroke="hsl(var(--terminal-orange))" strokeWidth="2">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 12 12;360 12 12"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <text x="12" y="16" textAnchor="middle" fontSize="8" fill="hsl(var(--terminal-orange))">►</text>
    </svg>
  ),

  // Security level indicators
  Classified: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="11" width="18" height="10" rx="2" fill="hsl(var(--terminal-crimson))" />
      <circle cx="12" cy="7" r="3" fill="none" stroke="hsl(var(--terminal-crimson))" strokeWidth="2" />
      <text x="12" y="18" textAnchor="middle" fontSize="8" fill="white">🔒</text>
    </svg>
  ),

  Accessible: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="11" width="18" height="10" rx="2" fill="hsl(var(--terminal-red-secondary))" />
      <circle cx="12" cy="7" r="3" fill="none" stroke="hsl(var(--terminal-red-secondary))" strokeWidth="2" />
      <circle cx="12" cy="16" r="2" fill="white" />
      <text x="12" y="8" textAnchor="middle" fontSize="6" fill="white">🔓</text>
    </svg>
  ),

  // Terminal command indicators
  Command: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 6L6 8L8 10M16 6L18 8L16 10M12 14H12.01" 
            stroke="hsl(var(--terminal-red-primary))" 
            strokeWidth="2" 
            fill="none" />
      <text x="4" y="22" fontSize="8" fill="hsl(var(--terminal-red-primary))">$</text>
    </svg>
  ),

  Database: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="12" cy="5" rx="9" ry="3" fill="hsl(var(--terminal-red-primary))" />
      <path d="M21 12C21 13.66 16.97 15 12 15S3 13.66 3 12" 
            stroke="hsl(var(--terminal-red-primary))" 
            strokeWidth="2" 
            fill="none" />
      <path d="M3 5V19C3 20.66 7.03 22 12 22S21 20.66 21 19V5" 
            stroke="hsl(var(--terminal-red-primary))" 
            strokeWidth="2" 
            fill="none" />
      <text x="12" y="13" textAnchor="middle" fontSize="6" fill="white">DB</text>
    </svg>
  ),

  // Subscription tier indicators
  Recruit: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" 
               fill="hsl(var(--terminal-red-muted))" />
      <text x="12" y="15" textAnchor="middle" fontSize="8" fill="white">★</text>
    </svg>
  ),

  Operative: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" 
               fill="hsl(var(--terminal-red-secondary))" />
      <text x="12" y="15" textAnchor="middle" fontSize="7" fill="white">★★</text>
    </svg>
  ),

  Operator: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" 
               fill="hsl(var(--terminal-red-primary))" />
      <polygon points="12,4 14,8 18,8 15,11 16,16 12,13 8,16 9,11 6,8 10,8" 
               fill="hsl(var(--terminal-red-bright))" />
      <text x="12" y="15" textAnchor="middle" fontSize="6" fill="white">★★★</text>
    </svg>
  ),

  Shadow: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" 
               fill="hsl(var(--terminal-scarlet))" />
      <polygon points="12,4 14,8 18,8 15,11 16,16 12,13 8,16 9,11 6,8 10,8" 
               fill="hsl(var(--terminal-red-bright))" />
      <circle cx="12" cy="12" r="3" fill="hsl(var(--terminal-red-dark))" />
      <text x="12" y="15" textAnchor="middle" fontSize="5" fill="white">★★★★</text>
    </svg>
  ),

  // Progress indicators with shapes
  ProgressEmpty: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="10" width="20" height="4" fill="none" 
            stroke="hsl(var(--terminal-red-muted))" strokeWidth="1" />
      <text x="22" y="15" fontSize="6" fill="hsl(var(--terminal-red-muted))">░</text>
    </svg>
  ),

  ProgressFull: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="10" width="20" height="4" fill="hsl(var(--terminal-red-primary))" />
      <text x="22" y="15" fontSize="6" fill="hsl(var(--terminal-red-primary))">█</text>
    </svg>
  )
};

// Utility component for rendering symbols with fallback text
export function AccessibilitySymbol({ 
  type, 
  className = "w-4 h-4", 
  fallbackText,
  ariaLabel 
}: {
  type: keyof typeof TerminalSymbols;
  className?: string;
  fallbackText?: string;
  ariaLabel?: string;
}) {
  const Symbol = TerminalSymbols[type];
  
  return (
    <span className="inline-flex items-center" role="img" aria-label={ariaLabel || type}>
      <Symbol className={className} />
      {fallbackText && (
        <span className="sr-only">{fallbackText}</span>
      )}
    </span>
  );
}

// Status indicator component with both color and shape
export function StatusIndicator({ 
  status, 
  size = "sm" 
}: { 
  status: 'online' | 'offline' | 'warning' | 'error' | 'processing';
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-6 h-6"
  };

  const statusConfig = {
    online: { symbol: 'Online', text: '● ONLINE', color: 'text-terminal-red-primary' },
    offline: { symbol: 'Offline', text: '■ OFFLINE', color: 'text-terminal-red-muted' },
    warning: { symbol: 'Warning', text: '▲ WARNING', color: 'text-terminal-amber' },
    error: { symbol: 'Error', text: '◆ ERROR', color: 'text-terminal-scarlet' },
    processing: { symbol: 'Processing', text: '► PROCESSING', color: 'text-terminal-orange' }
  };

  const config = statusConfig[status];

  return (
    <div className={`flex items-center space-x-1 ${config.color}`}>
      <AccessibilitySymbol 
        type={config.symbol as keyof typeof TerminalSymbols}
        className={sizeClasses[size]}
        fallbackText={config.text}
        ariaLabel={`Status: ${status}`}
      />
      <span className="text-xs font-mono">{config.text}</span>
    </div>
  );
}