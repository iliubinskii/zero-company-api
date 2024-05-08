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
    const isExcluded = exclusionPaths.some(path => req.path.startsWith(path));

    // If the current path is excluded, pass to the next middleware
    if (isExcluded) {
      next();
      return;
    }

    // Apply the given middleware
    middleware(req, res, next);
  };
}
