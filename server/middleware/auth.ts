import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger';

/**
 * Enhanced authentication middleware with better error handling
 */
export const requireAuth = (req: Request & { session: any }, res: Response, next: NextFunction) => {
  if (!req.session?.userId) {
    logger.warn('Authentication required - no session', {
      path: req.path,
      method: req.method,
    });
    
    return res.status(401).json({ 
      error: 'Authentication Required',
      message: 'Please log in to access this resource',
      redirectTo: '/login',
    });
  }
  
  logger.debug('Authentication check passed', { userId: req.session.userId });
  next();
};

/**
 * Optional authentication middleware
 * Doesn't block request but attaches user info if available
 */
export const optionalAuth = (req: Request & { session: any }, res: Response, next: NextFunction) => {
  if (req.session?.userId) {
    logger.debug('Optional auth - user authenticated', { userId: req.session.userId });
  } else {
    logger.debug('Optional auth - no user session');
  }
  next();
};

/**
 * Admin-only middleware
 */
export const requireAdmin = (req: Request & { session: any }, res: Response, next: NextFunction) => {
  // First check if authenticated
  if (!req.session?.userId) {
    return res.status(401).json({ 
      error: 'Authentication Required',
      message: 'Admin access requires authentication',
    });
  }
  
  // Check admin status (you can customize this logic)
  const isAdmin = req.session.isAdmin || false;
  
  if (!isAdmin) {
    logger.warn('Admin access denied', { userId: req.session.userId });
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Admin access required',
    });
  }
  
  logger.info('Admin access granted', { userId: req.session.userId });
  next();
};