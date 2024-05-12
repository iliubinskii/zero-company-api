import { ErrorCode, Routes, UserEmailValidationSchema } from "../../schema";
import { assertDefined, buildErrorResponse, sendResponse } from "../../utils";
import { StatusCodes } from "http-status-codes";
import { UsersMiddleware } from "../../types";

export const usersMiddleware: UsersMiddleware = {
  userEmailFromJwtUser: (req, _res, next) => {
    req.userEmail = assertDefined(req.jwtUser).email;
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
