import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: number;
      sessionId:string
    }
  }
}
export {};