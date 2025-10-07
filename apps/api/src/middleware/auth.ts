import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User.js';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // User is attached by auth service when session is valid
  if (!req.user) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  next();
}

export function optionalAuth(req: AuthRequest, _res: Response, next: NextFunction) {
  // User may or may not be authenticated
  next();
}

