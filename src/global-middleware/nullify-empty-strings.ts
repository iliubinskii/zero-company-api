import { RequestHandler } from "express";

export const nullifyEmptyStrings: RequestHandler = (req, _res, next) => {
  for (const [key, value] of Object.entries(req.body))
    if (value === "")
      // eslint-disable-next-line security/detect-object-injection, unicorn/no-null -- Ok
      req.body[key] = null;

  next();
};
