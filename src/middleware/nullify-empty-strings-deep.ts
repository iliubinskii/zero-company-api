import type { RequestHandler } from "express";

export const nullifyEmptyStringsDeep: RequestHandler = (req, _res, next) => {
  req.body = nullify(req.body);

  next();
};

/**
 * Recursively replaces empty strings with `null`.
 * @param value - The value to check.
 * @returns The value or `null` if it's an empty string.
 */
function nullify(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(nullify);

  if (typeof value === "object" && value !== null)
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, nullify(val)])
    );

  return value === "" ? null : value;
}
