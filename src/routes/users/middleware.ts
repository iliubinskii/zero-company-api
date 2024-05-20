import { ErrorCode, UserEmailValidationSchema } from "../../schema";
import { assertDefined, buildErrorResponse, sendResponse } from "../../utils";
import type { Routes } from "../../schema";
import { StatusCodes } from "http-status-codes";
import type { UsersMiddleware } from "../../types";

export const usersMiddleware: UsersMiddleware = {
  userEmailFromJwtUser: (req, _res, next) => {
    req.userEmail = assertDefined(req.jwt).email;
    next();
  },
  userEmailFromParam: (req, res, next) => {
    const email = UserEmailValidationSchema.safeParse(req.params["email"]);

    if (email.success) {
      req.userEmail = email.data;
      next();
    } else
      sendResponse<Routes["/400"]["get"]>(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(ErrorCode.InvalidEmailParam)
      );
  }
};
