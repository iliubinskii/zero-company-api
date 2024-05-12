import { buildErrorResponse, sendResponse } from "../utils";
import { ErrorCode } from "../schema";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import zod from "zod";

export const requireIdParam: RequestHandler = (req, res, next) => {
  const id = IdValidationSchema.safeParse(req.params["id"]);

  if (id.success) {
    req.idParam = id.data;
    next();
  } else
    sendResponse(
      res,
      StatusCodes.BAD_REQUEST,
      buildErrorResponse(ErrorCode.InvalidIdParam)
    );
};

const IdValidationSchema = zod
  .string()
  .refine(value => /^[\da-f]{24}$/u.test(value));
