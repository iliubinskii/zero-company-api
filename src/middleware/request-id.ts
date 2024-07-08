import type { RequestHandler } from "express";
import { v4 as uuid } from "uuid";

export const requestId: RequestHandler = (req, _res, next) => {
  req.requestId = uuid();
  next();
};
