import { buildErrorResponse, sendResponseOld } from "../utils";
import { ErrorCode } from "../schema";
import type { RequestHandler } from "express";
import type { RoutesOld } from "../schema";
import { StatusCodes } from "http-status-codes";

export const requireJwtUser: RequestHandler = (req, res, next) => {
  if (req.jwt) next();
  else
    sendResponseOld<RoutesOld["*"]["UNAUTHORIZED"]>(
      res,
      StatusCodes.UNAUTHORIZED,
      buildErrorResponse(ErrorCode.Unauthorized)
    );
};
