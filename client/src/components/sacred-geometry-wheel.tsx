import { useEffect, useRef, useState } from "react";

interface SacredGeometryWheelProps {
  size?: number;
  speed?: number;
  brainwaveFrequency?: number; // Hz for synchronization
  intensity?: number; // 0-1 for brightness/opacity
  className?: string;
}

export function SacredGeometryWheel({
  size = 400,
  speed = 1,
  brainwaveFrequency = 10,
  intensity = 0.8,
  className = ""
}: SacredGeometryWheelProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number>();
  const [rotation, setRotation] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;
      
      // High-speed rotation synchronized with brainwave frequency
      const rotationSpeed = speed * (brainwaveFrequency / 10) * 360; // degrees per second
      const newRotation = (elapsed * rotationSpeed) % 360;
      
      // Pulse synchronization with brainwave frequency
      const pulseFreq = brainwaveFrequency / 2; // half frequency for visual comfort
      const newPulsePhase = (elapsed * pulseFreq * 2 * Math.PI) % (2 * Math.PI);
      
      setRotation(newRotation);
      setPulsePhase(newPulsePhase);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, brainwaveFrequency]);

  const centerX = size / 2;
  const centerY = size / 2;
  const mainRadius = size * 0.35;
  const circleRadius = size * 0.04;
  
  // Generate 13 circles in elliptical pattern
  const circles = Array.from({ length: 13 }, (_, i) => {
    const angle = (i / 13) * 2 * Math.PI;
    const ellipticalX = mainRadius * Math.cos(angle) * 1.2; // elliptical distortion
    const ellipticalY = mainRadius * Math.sin(angle) * 0.8;
    return {
      x: centerX + ellipticalX,
      y: centerY + ellipticalY,
      angle,
      index: i
    };
  });

  // Generate complex triangular shapes
  const generateTriangle = (centerX: number, centerY: number, radius: number, rotation: number, complexity: number) => {
    const points = [];
    const sides = 3 + complexity; // 3-6 sided polygons
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * 2 * Math.PI + rotation;
      const r = radius * (0.8 + 0.4 * Math.sin(angle * 3)); // varying radius
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  // Generate cross-sectional patterns
  const generateCrossSectionalPath = (startCircle: any, endCircle: any, complexity: number) => {
    const midX = (startCircle.x + endCircle.x) / 2;
    const midY = (startCircle.y + endCircle.y) / 2;
    const controlOffset = 30 + complexity * 20;
    
    const perpAngle = Math.atan2(endCircle.y - startCircle.y, endCircle.x - startCircle.x) + Math.PI / 2;
    const controlX = midX + controlOffset * Math.cos(perpAngle);
    const controlY = midY + controlOffset * Math.sin(perpAngle);
    
    return `M ${startCircle.x} ${startCircle.y} Q ${controlX} ${controlY} ${endCircle.x} ${endCircle.y}`;
  };

  // Dynamic color based on brainwave frequency
  const getFrequencyColor = (baseIntensity: number) => {
    const pulse = Math.sin(pulsePhase) * 0.3 + 0.7;
    const opacity = baseIntensity * intensity * pulse;
    
    // Red spectrum based on frequency
    if (brainwaveFrequency >= 30) return `rgba(220, 20, 20, ${opacity})`; // Gamma - Bright red
    if (brainwaveFrequency >= 12) return `rgba(180, 30, 30, ${opacity})`; // Beta - Medium red
    if (brainwaveFrequency >= 8) return `rgba(140, 40, 40, ${opacity})`; // Alpha - Darker red
    return `rgba(100, 50, 50, ${opacity})`; // Theta - Deep red
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(220, 20, 20, 0.3))',
        }}
      >
        {/* Background sacred pattern */}
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={getFrequencyColor(1)} />
            <stop offset="70%" stopColor={getFrequencyColor(0.3)} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          
          <pattern id="geometryPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill={getFrequencyColor(0.2)} />
          </pattern>
        </defs>

        {/* Central glow */}
        <circle
          cx={centerX}
          cy={centerY}
          r={mainRadius * 0.7}
          fill="url(#centerGlow)"
          transform={`rotate(${rotation * 0.3} ${centerX} ${centerY})`}
        />

        {/* Cross-sectional complex patterns between circles */}
        {circles.map((circle, i) => {
          const nextCircle = circles[(i + 1) % circles.length];
          const crossCircle = circles[(i + 6) % circles.length]; // Cross pattern
          const complexity = i % 3;
          
          return (
            <g key={`cross-${i}`}>
              {/* Curved connecting lines */}
              <path
                d={generateCrossSectionalPath(circle, nextCircle, complexity)}
                stroke={getFrequencyColor(0.6)}
                strokeWidth={2}
                fill="none"
                transform={`rotate(${rotation * (1 + i * 0.1)} ${centerX} ${centerY})`}
              />
              
              {/* Cross-sectional patterns */}
              <path
                d={generateCrossSectionalPath(circle, crossCircle, complexity + 1)}
                stroke={getFrequencyColor(0.4)}
                strokeWidth={1.5}
                fill="none"
                opacity={0.7}
                transform={`rotate(${-rotation * 0.7} ${centerX} ${centerY})`}
              />
              
              {/* Broader complex shapes */}
              <polygon
                points={generateTriangle(
                  (circle.x + centerX) / 2,
                  (circle.y + centerY) / 2,
                  20 + complexity * 10,
                  rotation * (1 + i * 0.2),
                  complexity
                )}
                fill={getFrequencyColor(0.3)}
                stroke={getFrequencyColor(0.8)}
                strokeWidth={1}
                transform={`rotate(${rotation * (i % 2 === 0 ? 1 : -1)} ${centerX} ${centerY})`}
              />
            </g>
          );
        })}

        {/* 13 alternating circles with complex triangular shapes */}
        {circles.map((circle, i) => {
          const shapeRotation = rotation * (i % 2 === 0 ? 1 : -1) * (1 + i * 0.1);
          const complexity = i % 4; // 0-3 complexity levels
          const triangleRadius = circleRadius + complexity * 8;
          
          return (
            <g key={`circle-${i}`}>
              {/* Main circle */}
              <circle
                cx={circle.x}
                cy={circle.y}
                r={circleRadius}
                fill={getFrequencyColor(0.8)}
                stroke={getFrequencyColor(1)}
                strokeWidth={2}
                transform={`rotate(${shapeRotation} ${centerX} ${centerY})`}
              />
              
              {/* Complex triangular shapes around each circle */}
              <polygon
                points={generateTriangle(circle.x, circle.y, triangleRadius, shapeRotation, complexity)}
                fill="none"
                stroke={getFrequencyColor(0.9)}
                strokeWidth={1.5}
                opacity={0.8}
                transform={`rotate(${-shapeRotation * 2} ${circle.x} ${circle.y})`}
              />
              
              {/* Alternating inner patterns */}
              {i % 2 === 0 ? (
                <polygon
                  points={generateTriangle(circle.x, circle.y, triangleRadius * 0.6, -shapeRotation, 2)}
                  fill={getFrequencyColor(0.4)}
                  transform={`rotate(${shapeRotation * 3} ${circle.x} ${circle.y})`}
                />
              ) : (
                <g>
                  <circle
                    cx={circle.x}
                    cy={circle.y}
                    r={triangleRadius * 0.3}
                    fill="none"
                    stroke={getFrequencyColor(0.7)}
                    strokeWidth={1}
                    transform={`rotate(${shapeRotation * 2} ${centerX} ${centerY})`}
                  />
                  <circle
                    cx={circle.x}
                    cy={circle.y}
                    r={triangleRadius * 0.5}
                    fill="none"
                    stroke={getFrequencyColor(0.5)}
                    strokeWidth={1}
                    transform={`rotate(${-shapeRotation} ${centerX} ${centerY})`}
                  />
                </g>
              )}
            </g>
          );
        })}

        {/* Central sacred symbol */}
        <g transform={`rotate(${rotation * 2} ${centerX} ${centerY})`}>
          <circle
            cx={centerX}
            cy={centerY}
            r={circleRadius * 1.5}
            fill={getFrequencyColor(1)}
            stroke={getFrequencyColor(1)}
            strokeWidth={3}
          />
          <polygon
            points={generateTriangle(centerX, centerY, circleRadius * 2.5, rotation * 3, 3)}
            fill="none"
            stroke={getFrequencyColor(1)}
            strokeWidth={2}
          />
        </g>

        {/* Frequency indicator text */}
        <text
          x={centerX}
          y={size - 20}
          textAnchor="middle"
          fill={getFrequencyColor(0.8)}
          fontSize="12"
          fontFamily="monospace"
          className="font-mono"
        >
          {brainwaveFrequency.toFixed(1)} Hz
        </text>
      </svg>
    </div>
  );
}