// server/replitAuth.ts
import type { Express, RequestHandler } from "express";

// No authentication / sessions for now
export async function setupAuth(app: Express) {
  // Nothing to configure – public API
}

// Always allow the request through
export const isAuthenticated: RequestHandler = (_req, _res, next) => {
  next();
};
