import type { RequestHandler } from "express";
import { parseNestingKeys } from "../utils";

export const parseNestedFormData: RequestHandler = (req, _res, next) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Ok
  req.body = parseNestingKeys(req.body);

  next();
};
