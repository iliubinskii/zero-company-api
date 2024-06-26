import { ErrorCode, IdValidationSchema } from "../schema";
import { buildErrorResponse, sendResponse } from "../utils";
import type { RequestHandler } from "express";
import type { Routes } from "../schema";
import { StatusCodes } from "http-status-codes";

export const requireIdParam: RequestHandler = (req, res, next) => {
  const id = IdValidationSchema.safeParse(req.params["id"]);

  if (id.success) {
    req.idParam = id.data;
    next();
  } else
    sendResponse<Routes["/400"]["get"]>(
      res,
      StatusCodes.BAD_REQUEST,
      buildErrorResponse(ErrorCode.InvalidIdParam)
    );
};
