import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  // add custom auth properties here if needed, e.g. user?: User;
}

export interface AuthenticatedResponse extends Response {
  // extend with custom response helpers if needed
}

export type IsAuthenticatedMiddleware = (
  req: AuthenticatedRequest,
  res: AuthenticatedResponse,
  next: NextFunction
) => void;

export const isAuthenticated = (req: any, res: any, next: any) => {
  // No authentication for now → always allow
  req.user = null;
  next();
};


export async function setupAuth() {
  // no auth in production for now
}
