import {
  GetCompaniesByUserOptionsValidationSchema,
  GetUsersOptionsValidationSchema,
  UserCreateValidationSchema,
  UserUpdateValidationSchema
} from "../../validation-schema";
import {
  assertDefined,
  assertString,
  buildErrorResponse,
  filterUndefinedProperties,
  sendResponse
} from "../../utils";
import { ErrorCode } from "../../schema";
import { StatusCodes } from "http-status-codes";
import { UsersMiddleware } from "../../types";
import { ZodError } from "zod";

export const usersMiddleware: UsersMiddleware = {
  requireValidGetCompaniesByUserOptions: (req, res, next) => {
    try {
      req.getCompaniesByUserOptions = filterUndefinedProperties(
        GetCompaniesByUserOptionsValidationSchema.parse(req.query)
      );
      next();
    } catch (err) {
      if (err instanceof ZodError)
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
      if (err instanceof ZodError)
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
      if (err instanceof ZodError)
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
      if (err instanceof ZodError)
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
  userEmailFromParams: (req, _res, next) => {
    req.userEmail = assertString(req.params["email"]).toLowerCase();
    next();
  }
};
