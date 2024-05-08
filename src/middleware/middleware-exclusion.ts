/* eslint-disable eslint-comments/no-unlimited-disable -- Temp */
/* eslint-disable -- Temp */
// @ts-nocheck

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
  // TODO: According to the JSDoc
  return (req, res, next) => {};
}
