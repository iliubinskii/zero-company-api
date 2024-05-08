import { RequestHandler } from "express";
import { strings } from "../types";

/**
 * Applies the given middleware to all paths except the ones specified
 * @param middleware - The middleware to apply
 * @param exclusionPaths - The paths to exclude the middleware from
 * @returns A middleware that applies the given middleware to all paths except the ones specified
 */
export function middlewareExclusion(
  middleware: RequestHandler,
  exclusionPaths: strings
): RequestHandler {
  return (req, res, next) => {
    // Check if the current request path is in the exclusion paths
    const isExcluded = exclusionPaths.includes(req.path);

    // If the current path is excluded, pass it directly to the next handler
    // Otherwise apply the middleware
    if (isExcluded) next();
    else middleware(req, res, next);
  };
}
