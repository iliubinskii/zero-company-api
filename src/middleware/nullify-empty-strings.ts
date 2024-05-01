import { RequestHandler } from "express";

export const nullifyEmptyStrings: RequestHandler = (req, _res, next) => {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const body = req.body as { [key: string]: unknown };

  for (const [key, value] of Object.entries(body))
    if (value === "")
      // eslint-disable-next-line security/detect-object-injection -- Ok
      body[key] = null;

  next();
};
