import type { RequestHandler } from "express";

export const stripEmptyStrings: RequestHandler = (req, _res, next) => {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const body = req.body as Record<string, unknown>;

  for (const [key, value] of Object.entries(body))
    if (value === "") delete body[key];

  next();
};
