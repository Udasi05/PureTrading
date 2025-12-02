import type { Express, RequestHandler } from "express";

// No-op session middleware for local development
export function getSession() {
  return (req: any, res: any, next: any) => next();
}

// No auth setup in local dev
export async function setupAuth(app: Express) {
  // nothing
}

// Always treat user as authenticated in local dev
export const isAuthenticated: RequestHandler = (req, res, next) => {
  return next();
};