import type { RequestHandler } from "express";
import _ from "lodash";

export const parseNestedFormData: RequestHandler = (req, _res, next) => {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const body = req.body as Record<string, unknown>;

  const substitutes: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(body))
    if (/[.[\]]/u.test(key)) {
      // Direct assignment to body does not work
      _.set(substitutes, key, value);

      delete body[key];
    }

  Object.assign(body, substitutes);

  next();
};
