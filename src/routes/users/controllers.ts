import type {
  CompaniesService,
  GetCompaniesParentRef,
  UserControllers,
  UsersService
} from "../../types";
import {
  ErrorCode,
  GetCompaniesOptionsValidationSchema,
  GetUsersOptionsValidationSchema,
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
import type { Routes } from "../../schema";
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
      const jwt = assertDefined(req.jwt);

      const user = UserCreateValidationSchema.safeParse(req.body);

      if (user.success) {
        const addedUser = await service.addUser({
          ...user.data,
          email: jwt.email
        });

        if (addedUser)
          sendResponse<Routes["/users"]["post"]>(
            res,
            StatusCodes.CREATED,
            addedUser
          );
        else
          sendResponse<Routes["/users"]["post"]>(
            res,
            StatusCodes.CONFLICT,
            buildErrorResponse(ErrorCode.AlreadyExists)
          );
      } else
        sendResponse<Routes["/users"]["post"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, user.error)
        );
    }),
    deleteUser: wrapAsyncHandler(async (req, res) => {
      const ref = assertDefined(req.userRef);

      const affectedRows = await service.deleteUser(ref);

      sendResponse<Routes["/users/{id}"]["delete"]>(res, StatusCodes.OK, {
        affectedRows
      });
    }),
    getCompaniesByUser: wrapAsyncHandler(async (req, res) => {
      const ref = assertDefined(req.userRef);

      const options = GetCompaniesOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const parentRef: GetCompaniesParentRef = (() => {
          switch (ref.type) {
            case "id": {
              return {
                founderId: ref.id,
                type: "founderId"
              };
            }

            case "email": {
              return {
                founderEmail: ref.email,
                type: "founderEmail"
              };
            }
          }
        })();

        const companies = await companiesService.getCompanies(
          filterUndefinedProperties(options.data),
          parentRef
        );

        sendResponse<Routes["/users/{id}/companies"]["get"]>(
          res,
          StatusCodes.OK,
          companies
        );
      } else
        sendResponse<Routes["/users/{id}/companies"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    getUser: wrapAsyncHandler(async (req, res) => {
      const ref = assertDefined(req.userRef);

      const user = await service.getUser(ref);

      if (user)
        sendResponse<Routes["/users/{id}"]["get"]>(res, StatusCodes.OK, user);
      else
        sendResponse<Routes["/users/{id}"]["get"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.NotFound)
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
      const ref = assertDefined(req.userRef);

      const user = UserUpdateValidationSchema.safeParse(req.body);

      if (user.success) {
        const updatedUser = await service.updateUser(
          ref,
          filterUndefinedProperties(user.data)
        );

        if (updatedUser)
          sendResponse<Routes["/users/{id}"]["put"]>(
            res,
            StatusCodes.OK,
            updatedUser
          );
        else
          sendResponse<Routes["/users/{id}"]["put"]>(
            res,
            StatusCodes.NOT_FOUND,
            buildErrorResponse(ErrorCode.NotFound)
          );
      } else
        sendResponse<Routes["/users/{id}"]["put"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, user.error)
        );
    })
  };
}
