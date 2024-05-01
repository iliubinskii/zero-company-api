import { RequestHandler } from "express";
import { logger } from "../global-services";

export const logRequest: RequestHandler = (req, _res, next) => {
  logger.info(`${req.method} ${req.url}`, { requestId: req.requestId });
  next();
};
