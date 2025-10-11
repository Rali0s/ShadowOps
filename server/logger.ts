import { Request, Response, NextFunction } from 'express';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

class Logger {
  private level: LogLevel;
  
  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = process.env.NODE_ENV === 'production' ? LogLevel.WARN : level;
  }
  
  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const baseMessage = `[${timestamp}] [${level}] ${message}`;
    
    if (data) {
      if (typeof data === 'object') {
        return `${baseMessage} ${JSON.stringify(data, null, 2)}`;
      }
      return `${baseMessage} ${data}`;
    }
    
    return baseMessage;
  }
  
  debug(message: string, data?: any) {
    if (this.level <= LogLevel.DEBUG) {
      console.log(colors.dim + this.formatMessage('DEBUG', message, data) + colors.reset);
    }
  }
  
  info(message: string, data?: any) {
    if (this.level <= LogLevel.INFO) {
      console.log(colors.cyan + this.formatMessage('INFO', message, data) + colors.reset);
    }
  }
  
  warn(message: string, data?: any) {
    if (this.level <= LogLevel.WARN) {
      console.warn(colors.yellow + this.formatMessage('WARN', message, data) + colors.reset);
    }
  }
  
  error(message: string, error?: any) {
    if (this.level <= LogLevel.ERROR) {
      const errorData = error instanceof Error 
        ? { message: error.message, stack: error.stack }
        : error;
      console.error(colors.red + this.formatMessage('ERROR', message, errorData) + colors.reset);
    }
  }
  
  success(message: string, data?: any) {
    console.log(colors.green + this.formatMessage('SUCCESS', message, data) + colors.reset);
  }
}

export const logger = new Logger();

// Express middleware for request logging
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const originalSend = res.send;
  
  res.send = function(data) {
    res.send = originalSend;
    const duration = Date.now() - start;
    
    // Log based on status code
    const statusCode = res.statusCode;
    const message = `${req.method} ${req.path} - ${statusCode} - ${duration}ms`;
    
    if (statusCode >= 500) {
      logger.error(message, { body: req.body, query: req.query });
    } else if (statusCode >= 400) {
      logger.warn(message, { body: req.body, query: req.query });
    } else if (req.path.startsWith('/api')) {
      logger.info(message);
    } else {
      logger.debug(message);
    }
    
    return res.send.call(this, data);
  };
  
  next();
};

// Error handling middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error handling ${req.method} ${req.path}`, err);
  
  const status = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message || 'Internal Server Error';
  
  res.status(status).json({
    error: {
      message,
      status,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
};