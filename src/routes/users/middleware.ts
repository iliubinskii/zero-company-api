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
    const getCompaniesByUserOptions =
      GetCompaniesByUserOptionsValidationSchema.safeParse(req.query);

    if (getCompaniesByUserOptions.success) {
      req.getCompaniesByUserOptions = filterUndefinedProperties(
        getCompaniesByUserOptions.data
      );
      next();
    } else
      sendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(
          ErrorCode.InvalidQuery,
          getCompaniesByUserOptions.error.errors
        )
      );
  },
  requireValidGetUsersOptions: (req, res, next) => {
    const getUsersOptions = GetUsersOptionsValidationSchema.safeParse(
      req.query
    );

    if (getUsersOptions.success) {
      req.getUsersOptions = filterUndefinedProperties(getUsersOptions.data);
      next();
    } else
      sendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(ErrorCode.InvalidQuery, getUsersOptions.error.errors)
      );
  },
  requireValidUserCreate: (req, res, next) => {
    const userCreate = UserCreateValidationSchema.safeParse(req.body);

    if (userCreate.success) {
      req.userCreate = userCreate.data;
      next();
    } else
      sendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(ErrorCode.InvalidUserData, userCreate.error.errors)
      );
  },
  requireValidUserUpdate: (req, res, next) => {
    const userUpdate = UserUpdateValidationSchema.safeParse(req.body);

    if (userUpdate.success) {
      req.userUpdate = filterUndefinedProperties(userUpdate.data);
      next();
    } else
      sendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(ErrorCode.InvalidUserData, userUpdate.error.errors)
      );
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
