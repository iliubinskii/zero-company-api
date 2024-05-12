import {
  ErrorCode,
  GetCompaniesByUserOptionsValidationSchema,
  GetUsersOptionsValidationSchema,
  UserCreateValidationSchema,
  UserUpdateValidationSchema,
  preprocessEmail
} from "../../schema";
import {
  assertDefined,
  buildErrorResponse,
  filterUndefinedProperties,
  sendResponse
} from "../../utils";
import { StatusCodes } from "http-status-codes";
import { UsersMiddleware } from "../../types";
import zod from "zod";

export const usersMiddleware: UsersMiddleware = {
  requireValidGetCompaniesByUserOptions: (req, res, next) => {
    try {
      req.getCompaniesByUserOptions = filterUndefinedProperties(
        GetCompaniesByUserOptionsValidationSchema.parse(req.query)
      );
      next();
    } catch (err) {
      if (err instanceof zod.ZodError)
        sendResponse(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, err.errors)
        );
      else throw err;
    }
  },
  requireValidGetUsersOptions: (req, res, next) => {
    try {
      req.getUsersOptions = filterUndefinedProperties(
        GetUsersOptionsValidationSchema.parse(req.query)
      );
      next();
    } catch (err) {
      if (err instanceof zod.ZodError)
        sendResponse(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, err.errors)
        );
      else throw err;
    }
  },
  requireValidUserCreate: (req, res, next) => {
    try {
      req.userCreate = UserCreateValidationSchema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof zod.ZodError)
        sendResponse(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidUserData, err.errors)
        );
      else throw err;
    }
  },
  requireValidUserUpdate: (req, res, next) => {
    try {
      req.userUpdate = filterUndefinedProperties(
        UserUpdateValidationSchema.parse(req.body)
      );
      next();
    } catch (err) {
      if (err instanceof zod.ZodError)
        sendResponse(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidUserData, err.errors)
        );
      else throw err;
    }
  },
  userEmailFromJwtUser: (req, _res, next) => {
    req.userEmail = assertDefined(req.jwtUser).email;
    next();
  },
  userEmailFromParams: (req, res, next) => {
    const email = EmailValidationSchema.safeParse(req.params["email"]);

    if (email.success) {
      req.userEmail = email.data;
      next();
    } else
      sendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(ErrorCode.InvalidEmailParam)
      );
  }
};

const EmailValidationSchema = preprocessEmail(zod.string().email());
