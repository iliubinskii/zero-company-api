import { buildErrorResponse, sendResponseOld } from "../utils";
import { ADMIN_EMAIL } from "../config";
import { ErrorCode } from "../schema";
import type { RequestHandler } from "express";
import type { RoutesOld } from "../schema";
import { StatusCodes } from "http-status-codes";

export const requireJwtAdmin: RequestHandler = (req, res, next) => {
  if (req.jwt && ADMIN_EMAIL.includes(req.jwt.email)) next();
  else
    sendResponseOld<RoutesOld["*"]["UNAUTHORIZED"]>(
      res,
      StatusCodes.UNAUTHORIZED,
      buildErrorResponse(ErrorCode.Unauthorized)
    );
};
