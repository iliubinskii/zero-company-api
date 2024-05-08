import { HttpMethod } from "../types";
import { RequestHandler } from "express";

/**
 * Applies the given middleware to all paths except the ones specified
 * @param middleware - The middleware to apply
 * @param exclusionRoutes - The routes to exclude from the middleware
 * @returns A middleware that applies the given middleware to all paths except the ones specified
 */
export function middlewareExclusion(
  middleware: RequestHandler,
  exclusionRoutes: ExclusionRoutes
): RequestHandler {
  return (req, res, next) => {
    // Check if the current request path is in the exclusion paths
    const isExcluded = exclusionRoutes.some(
      ([method, path]) => method === req.method && path === req.path
    );

    // If the current path is excluded, pass it directly to the next handler
    // Otherwise apply the middleware
    if (isExcluded) next();
    else middleware(req, res, next);
  };
}

export type ExclusionRoute = readonly [HttpMethod, string];

export type ExclusionRoutes = readonly ExclusionRoute[];
