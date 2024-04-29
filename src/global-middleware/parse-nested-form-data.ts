import { RequestHandler } from "express";
import { Writable } from "ts-toolbelt/out/Object/Writable";
import _ from "lodash";

export const parseNestedFormData: RequestHandler = (req, _res, next) => {
  const substitutes: Writable<Substitutes> = {};

  for (const [key, value] of Object.entries(req.body))
    if (/[.[\]]/u.test(key)) {
      _.set(substitutes, key, value);
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete, security/detect-object-injection -- Ok
      delete req.body[key];
    }

  Object.assign(req.body, substitutes);

  next();
};

interface Substitutes {
  readonly [key: string]: unknown;
}
