import type { RequestHandler } from "express";
import { set } from "lodash";

export const parseNestedQuery: RequestHandler = (req, _res, next) => {
  const { query } = req;

  const substitutes: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(query))
    if (/[.[\]]/u.test(key)) {
      // Direct assignment to query does not work
      set(substitutes, key, value);

      delete query[key];
    }

  Object.assign(query, substitutes);

  next();
};
