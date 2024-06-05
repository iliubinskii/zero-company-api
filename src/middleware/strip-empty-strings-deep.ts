import type { RequestHandler } from "express";

export const stripEmptyStringsDeep: RequestHandler = (req, _res, next) => {
  req.body = strip(req.body);

  next();
};

/**
 * Recursively removes empty strings.
 * @param value - The value to check.
 * @returns The value or `null` if it's an empty string.
 */
function strip(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(strip);

  if (typeof value === "object" && value !== null)
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, strip(val)])
    );

  return value === "" ? undefined : value;
}
