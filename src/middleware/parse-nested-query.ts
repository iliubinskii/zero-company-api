import type { RequestHandler } from "express";
import { parseNestingKeys } from "../utils";

export const parseNestedQuery: RequestHandler = (req, _res, next) => {
  req.query = parseNestingKeys(req.query);

  next();
};
