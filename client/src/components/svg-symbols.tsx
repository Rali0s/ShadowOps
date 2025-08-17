import React from 'react';

// Comprehensive SVG Symbol Library for Terminal and UI
export const SVGSymbols = {
  // Network and Connection Symbols
  Network: ({ className = "w-4 h-4", variant = "primary" }: { className?: string; variant?: "primary" | "secondary" | "muted" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" fill={`hsl(var(--terminal-red-${variant}))`} />
      <circle cx="12" cy="4" r="2" fill={`hsl(var(--terminal-red-${variant}))`} />
      <circle cx="20" cy="8" r="2" fill={`hsl(var(--terminal-red-${variant}))`} />
      <circle cx="20" cy="16" r="2" fill={`hsl(var(--terminal-red-${variant}))`} />
      <circle cx="12" cy="20" r="2" fill={`hsl(var(--terminal-red-${variant}))`} />
      <circle cx="4" cy="16" r="2" fill={`hsl(var(--terminal-red-${variant}))`} />
      <circle cx="4" cy="8" r="2" fill={`hsl(var(--terminal-red-${variant}))`} />
      <path d="M15 12l5-4M9 12L4 8M15 12l5 4M9 12L4 16M12 9V6M12 18v3" 
            stroke={`hsl(var(--terminal-red-${variant}))`} strokeWidth="2" />
    </svg>
  ),

  // Security Level Indicators with Shapes
  SecurityShield: ({ level = 1, className = "w-4 h-4" }: { level?: 1 | 2 | 3; className?: string }) => {
    const colors = ['--terminal-red-muted', '--terminal-red-secondary', '--terminal-scarlet'];
    const shapes = ['■', '▲', '◆'];
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 7V13C4 18.55 7.84 22 12 22S20 18.55 20 13V7L12 2Z" 
              fill={`hsl(var(${colors[level - 1]}))`} 
              stroke="white" 
              strokeWidth="1" />
        <text x="12" y="16" textAnchor="middle" fontSize="10" fill="white">
          {shapes[level - 1]}
        </text>
        <text x="12" y="8" textAnchor="middle" fontSize="6" fill="white">
          {level}
        </text>
      </svg>
    );
  },

  // Progress and Status Bars
  ProgressBar: ({ progress, className = "w-16 h-3" }: { progress: number; className?: string }) => (
    <svg className={className} viewBox="0 0 100 20" fill="none">
      <rect x="2" y="8" width="96" height="4" 
            fill="none" 
            stroke="hsl(var(--terminal-red-muted))" 
            strokeWidth="1" />
      <rect x="2" y="8" width={progress} height="4" 
            fill="hsl(var(--terminal-red-primary))" />
      <text x={progress > 50 ? "50" : "90"} y="16" 
            fontSize="8" 
            textAnchor="middle" 
            fill="hsl(var(--terminal-red-primary))">
        {Math.round(progress)}%
      </text>
    </svg>
  ),

  // Terminal Command Icons
  TerminalPrompt: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="3" width="20" height="18" rx="2" 
            fill="hsl(var(--terminal-bg))" 
            stroke="hsl(var(--terminal-red-primary))" 
            strokeWidth="1" />
      <path d="M6 8L10 12L6 16" 
            stroke="hsl(var(--terminal-red-primary))" 
            strokeWidth="2" 
            fill="none" />
      <line x1="14" y1="16" x2="18" y2="16" 
            stroke="hsl(var(--terminal-red-primary))" 
            strokeWidth="2" />
      <text x="4" y="6" fontSize="4" fill="hsl(var(--terminal-red-primary))">◄</text>
    </svg>
  ),

  // File System Icons
  FileSecure: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" 
            fill="hsl(var(--terminal-red-dark))" 
            stroke="hsl(var(--terminal-red-primary))" 
            strokeWidth="1" />
      <polyline points="14,2 14,8 20,8" 
                stroke="hsl(var(--terminal-red-primary))" 
                strokeWidth="1" 
                fill="hsl(var(--terminal-red-muted))" />
      <rect x="8" y="13" width="8" height="5" rx="1" 
            fill="none" 
            stroke="hsl(var(--terminal-scarlet))" 
            strokeWidth="1" />
      <circle cx="12" cy="15.5" r="1" fill="hsl(var(--terminal-scarlet))" />
      <text x="12" y="12" textAnchor="middle" fontSize="6" fill="white">🔒</text>
    </svg>
  ),

  FileAccessible: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" 
            fill="hsl(var(--terminal-red-secondary))" 
            stroke="hsl(var(--terminal-red-primary))" 
            strokeWidth="1" />
      <polyline points="14,2 14,8 20,8" 
                stroke="hsl(var(--terminal-red-primary))" 
                strokeWidth="1" 
                fill="hsl(var(--terminal-red-bright))" />
      <circle cx="12" cy="15" r="3" 
              fill="none" 
              stroke="hsl(var(--terminal-red-bright))" 
              strokeWidth="1" />
      <circle cx="12" cy="15" r="1" fill="hsl(var(--terminal-red-bright))" />
      <text x="12" y="12" textAnchor="middle" fontSize="6" fill="white">✓</text>
    </svg>
  ),

  // System Status Icons
  CPULoad: ({ load, className = "w-4 h-4" }: { load: number; className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="2" 
            fill="none" 
            stroke="hsl(var(--terminal-red-primary))" 
            strokeWidth="1" />
      <rect x="6" y="6" width="12" height="12" 
            fill={load > 80 ? "hsl(var(--terminal-scarlet))" : 
                  load > 50 ? "hsl(var(--terminal-amber))" : 
                  "hsl(var(--terminal-red-primary))"} 
            opacity={load / 100} />
      <text x="12" y="15" textAnchor="middle" fontSize="8" fill="white">
        {load}%
      </text>
      <text x="12" y="3" textAnchor="middle" fontSize="6" fill="hsl(var(--terminal-red-primary))">
        CPU
      </text>
    </svg>
  ),

  MemoryUsage: ({ usage, className = "w-4 h-4" }: { usage: number; className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="12" rx="2" 
            fill="none" 
            stroke="hsl(var(--terminal-red-primary))" 
            strokeWidth="1" />
      {[...Array(8)].map((_, i) => (
        <rect key={i} x={3 + i * 2.25} y="8" width="1.5" height="8" 
              fill={i < Math.floor(usage / 12.5) ? 
                    "hsl(var(--terminal-red-primary))" : 
                    "hsl(var(--terminal-red-muted))"} />
      ))}
      <text x="12" y="4" textAnchor="middle" fontSize="6" fill="hsl(var(--terminal-red-primary))">
        MEM {usage}%
      </text>
    </svg>
  ),

  // Data Flow Indicators
  DataUpload: ({ className = "w-4 h-4", active = false }: { className?: string; active?: boolean }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L8 6H11V14H13V6H16L12 2Z" 
            fill={active ? "hsl(var(--terminal-red-bright))" : "hsl(var(--terminal-red-muted))"} />
      <path d="M3 18V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V18" 
            stroke={active ? "hsl(var(--terminal-red-bright))" : "hsl(var(--terminal-red-muted))"} 
            strokeWidth="2" 
            fill="none" />
      <text x="12" y="20" textAnchor="middle" fontSize="6" fill="white">▲</text>
      {active && (
        <circle cx="18" cy="6" r="2" fill="hsl(var(--terminal-red-bright))">
          <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  ),

  DataDownload: ({ className = "w-4 h-4", active = false }: { className?: string; active?: boolean }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 22L16 18H13V10H11V18H8L12 22Z" 
            fill={active ? "hsl(var(--terminal-red-bright))" : "hsl(var(--terminal-red-muted))"} />
      <path d="M3 6V4C3 2.9 3.9 2 5 2H19C20.1 2 21 2.9 21 4V6" 
            stroke={active ? "hsl(var(--terminal-red-bright))" : "hsl(var(--terminal-red-muted))"} 
            strokeWidth="2" 
            fill="none" />
      <text x="12" y="8" textAnchor="middle" fontSize="6" fill="white">▼</text>
      {active && (
        <circle cx="18" cy="18" r="2" fill="hsl(var(--terminal-red-bright))">
          <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  ),

  // Subscription Tier Badges
  TierBadge: ({ tier, className = "w-6 h-6" }: { tier: 'recruit' | 'operator' | 'shadow'; className?: string }) => {
    const tierConfig = {
      recruit: { stars: 1, color: '--terminal-red-muted', shape: '●' },
      operator: { stars: 2, color: '--terminal-red-secondary', shape: '■' },
      shadow: { stars: 3, color: '--terminal-scarlet', shape: '▲' }
    };
    const config = tierConfig[tier];
    
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" 
                fill={`hsl(var(${config.color}))`} 
                stroke="white" 
                strokeWidth="1" />
        <text x="12" y="8" textAnchor="middle" fontSize="8" fill="white">
          {'★'.repeat(config.stars)}
        </text>
        <text x="12" y="18" textAnchor="middle" fontSize="10" fill="white">
          {config.shape}
        </text>
      </svg>
    );
  }
};

// Utility component for color blind accessibility
export function AccessibleIcon({ 
  icon, 
  shape, 
  color, 
  className = "w-4 h-4",
  ariaLabel 
}: {
  icon: React.ReactNode;
  shape?: string;
  color?: string;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <span className="inline-flex items-center" role="img" aria-label={ariaLabel}>
      <span className={color}>{icon}</span>
      {shape && (
        <span className="ml-1 text-xs font-mono" aria-hidden="true">
          {shape}
        </span>
      )}
    </span>
  );
}

// Terminal status bar with multiple indicators
export function TerminalStatusBar({ 
  cpuLoad = 0, 
  memUsage = 0, 
  networkActive = false,
  securityLevel = 1,
  className = "" 
}: {
  cpuLoad?: number;
  memUsage?: number;
  networkActive?: boolean;
  securityLevel?: 1 | 2 | 3;
  className?: string;
}) {
  return (
    <div className={`flex items-center space-x-3 text-xs font-mono ${className}`}>
      <AccessibleIcon 
        icon={<SVGSymbols.CPULoad load={cpuLoad} />}
        shape="■"
        color="text-terminal-red-primary"
        ariaLabel={`CPU Load: ${cpuLoad}%`}
      />
      <AccessibleIcon 
        icon={<SVGSymbols.MemoryUsage usage={memUsage} />}
        shape="▬"
        color="text-terminal-red-secondary"
        ariaLabel={`Memory Usage: ${memUsage}%`}
      />
      <AccessibleIcon 
        icon={<SVGSymbols.Network variant={networkActive ? "primary" : "muted"} />}
        shape={networkActive ? "●" : "○"}
        color={networkActive ? "text-terminal-red-bright" : "text-terminal-red-muted"}
        ariaLabel={`Network: ${networkActive ? 'Active' : 'Inactive'}`}
      />
      <AccessibleIcon 
        icon={<SVGSymbols.SecurityShield level={securityLevel} />}
        shape={securityLevel === 3 ? "▲" : securityLevel === 2 ? "■" : "●"}
        color="text-terminal-red-primary"
        ariaLabel={`Security Level: ${securityLevel}`}
      />
    </div>
  );
}