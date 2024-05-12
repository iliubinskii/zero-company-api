import { CompaniesService, UserControllers, UsersService } from "../../types";
import {
  ErrorCode,
  GetCompaniesByUserOptionsValidationSchema,
  GetUsersOptionsValidationSchema,
  Routes,
  UserCreateValidationSchema,
  UserUpdateValidationSchema
} from "../../schema";
import {
  assertDefined,
  buildErrorResponse,
  filterUndefinedProperties,
  sendResponse,
  wrapAsyncHandler
} from "../../utils";
import { StatusCodes } from "http-status-codes";

/**
 * Creates user controllers.
 * @param service - The users service.
 * @param companiesService - The companies service.
 * @returns The user controllers.
 */
export function createUserControllers(
  service: UsersService,
  companiesService: CompaniesService
): UserControllers {
  return {
    addUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const user = UserCreateValidationSchema.safeParse(req.body);

      if (user.success) {
        const addedUser = await service.addUser({ ...user.data, email });

        if (addedUser)
          sendResponse<Routes["/users/{email}"]["post"]>(
            res,
            StatusCodes.CREATED,
            addedUser
          );
        else
          sendResponse<Routes["/users/{email}"]["post"]>(
            res,
            StatusCodes.CONFLICT,
            buildErrorResponse(ErrorCode.UserAlreadyExists)
          );
      } else
        sendResponse<Routes["/users/{email}"]["post"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidUserData, user.error)
        );
    }),
    deleteUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const affectedRows = await service.deleteUser(email);

      sendResponse<Routes["/users/{email}"]["delete"]>(res, StatusCodes.OK, {
        affectedRows
      });
    }),
    getCompaniesByUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const options = GetCompaniesByUserOptionsValidationSchema.safeParse(
        req.query
      );

      if (options.success) {
        const companies = await companiesService.getCompanies({
          ...filterUndefinedProperties(options.data),
          founderEmail: email
        });

        sendResponse<Routes["/users/{email}/companies"]["get"]>(
          res,
          StatusCodes.OK,
          companies
        );
      } else
        sendResponse<Routes["/users/{email}/companies"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    getUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const user = await service.getUser(email);

      if (user)
        sendResponse<Routes["/users/{email}"]["get"]>(
          res,
          StatusCodes.OK,
          user
        );
      else
        sendResponse<Routes["/users/{email}"]["get"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.UserNotFound)
        );
    }),
    getUsers: wrapAsyncHandler(async (req, res) => {
      const options = GetUsersOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const users = await service.getUsers(
          filterUndefinedProperties(options.data)
        );

        sendResponse<Routes["/users"]["get"]>(res, StatusCodes.OK, users);
      } else
        sendResponse<Routes["/users"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    updateUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const user = UserUpdateValidationSchema.safeParse(req.body);

      if (user.success) {
        const updatedUser = await service.updateUser(
          email,
          filterUndefinedProperties(user.data)
        );

        if (updatedUser)
          sendResponse<Routes["/users/{email}"]["put"]>(
            res,
            StatusCodes.OK,
            updatedUser
          );
        else
          sendResponse<Routes["/users/{email}"]["put"]>(
            res,
            StatusCodes.NOT_FOUND,
            buildErrorResponse(ErrorCode.UserNotFound)
          );
      } else
        sendResponse<Routes["/users/{email}"]["put"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidUserData, user.error)
        );
    })
  };
}
