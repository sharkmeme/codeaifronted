import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import validator from 'validator';

const isProduction = process.env.NODE_ENV === 'production';

export const allowedOrigins = [
  'https://bunnycode.ai',
  'https://www.bunnycode.ai',
  'http://localhost:5000',
  'http://localhost:3000',
];

export const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1 || !isProduction) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

export const securityHeaders = helmet({
  contentSecurityPolicy: false,
  xFrameOptions: { action: 'deny' },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  hsts: {
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true
  },
});

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => !isProduction,
});

export const strictRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => !isProduction,
});

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  let sanitized = validator.trim(input);
  sanitized = validator.escape(sanitized);
  
  return sanitized;
}

export function sanitizeEmail(email: string): string | null {
  if (typeof email !== 'string') return null;
  
  const trimmed = validator.trim(email);
  const normalized = validator.normalizeEmail(trimmed) || trimmed;
  
  if (!validator.isEmail(normalized)) {
    return null;
  }
  
  return normalized;
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (isProduction) {
    const status = err.status || err.statusCode || 500;
    
    if (status >= 500) {
      return res.status(status).json({ 
        success: false,
        error: 'An error occurred. Please try again later.' 
      });
    }
    
    return res.status(status).json({ 
      success: false,
      error: err.message || 'An error occurred.' 
    });
  } else {
    const status = err.status || err.statusCode || 500;
    res.status(status).json({ 
      success: false,
      error: err.message || 'Internal Server Error',
      stack: err.stack 
    });
  }
}

export function permissionsPolicyMiddleware(req: Request, res: Response, next: NextFunction) {
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );
  next();
}
