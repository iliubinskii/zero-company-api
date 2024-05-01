import { ErrorCode } from "../schema";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { buildErrorResponse } from "../utils";

export const requireJwtAdmin: RequestHandler = (req, res, next) => {
  if (req.authUser && req.authUser.admin) next();
  else
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json(buildErrorResponse(ErrorCode.Unauthorized));
};
