import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";

export const requestId: RequestHandler = (req, _res, next) => {
  req.requestId = uuidv4();
  next();
};
