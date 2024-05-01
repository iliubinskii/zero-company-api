import { RequestHandler } from "express";
import _ from "lodash";

export const parseNestedFormData: RequestHandler = (req, _res, next) => {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const body = req.body as { [key: string]: unknown };

  const substitutes: { [key: string]: unknown } = {};

  for (const [key, value] of Object.entries(body))
    if (/[.[\]]/u.test(key)) {
      // Direct assignment to body does not work
      _.set(substitutes, key, value);

      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete, security/detect-object-injection -- Ok
      delete body[key];
    }

  Object.assign(body, substitutes);

  next();
};
