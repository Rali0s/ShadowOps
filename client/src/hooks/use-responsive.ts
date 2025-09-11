import { useMediaQuery } from 'react-responsive';
import { ReactNode } from 'react';

// Standard mobile breakpoints based on device research
export const breakpoints = {
  xs: 320,      // iPhone SE (2020)
  sm: 375,      // iPhone 6/7/8/X/12 Mini  
  md: 390,      // iPhone 12/13/14 Pro
  lg: 414,      // iPhone 6/7/8 Plus, Galaxy devices
  xl: 430,      // iPhone 14 Pro Max
  tablet: 768,  // Tablet
  desktop: 1024 // Desktop
};

// Mobile device hooks
export const useIsMobile = () => useMediaQuery({ maxWidth: breakpoints.lg });
export const useIsTablet = () => useMediaQuery({ 
  minWidth: breakpoints.xl + 1, 
  maxWidth: breakpoints.tablet 
});
export const useIsDesktop = () => useMediaQuery({ minWidth: breakpoints.desktop });

// Specific mobile size hooks
export const useIsExtraSmall = () => useMediaQuery({ maxWidth: breakpoints.xs });
export const useIsSmall = () => useMediaQuery({ 
  minWidth: breakpoints.xs + 1, 
  maxWidth: breakpoints.sm 
});
export const useIsMedium = () => useMediaQuery({ 
  minWidth: breakpoints.sm + 1, 
  maxWidth: breakpoints.md 
});
export const useIsLarge = () => useMediaQuery({ 
  minWidth: breakpoints.md + 1, 
  maxWidth: breakpoints.lg 
});

// Responsive component helpers
interface ResponsiveProps {
  children: ReactNode;
}

export const Mobile = ({ children }: ResponsiveProps) => {
  const isMobile = useIsMobile();
  return isMobile ? children : null;
};

export const Tablet = ({ children }: ResponsiveProps) => {
  const isTablet = useIsTablet();
  return isTablet ? children : null;
};

export const Desktop = ({ children }: ResponsiveProps) => {
  const isDesktop = useIsDesktop();
  return isDesktop ? children : null;
};

// Conditional rendering based on screen size
interface ConditionalProps {
  breakpoint: keyof typeof breakpoints;
  children: ReactNode;
}

export const ShowAbove = ({ breakpoint, children }: ConditionalProps) => {
  const isAbove = useMediaQuery({ minWidth: breakpoints[breakpoint] });
  return isAbove ? children : null;
};

export const ShowBelow = ({ breakpoint, children }: ConditionalProps) => {
  const isBelow = useMediaQuery({ maxWidth: breakpoints[breakpoint] });
  return isBelow ? children : null;
};