import { CompaniesService, UserControllers, UsersService } from "../../types";
import { ErrorCode, Routes } from "../../schema";
import {
  assertDefined,
  buildErrorResponse,
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
      const user = assertDefined(req.userCreate);

      const addedUser = await service.addUser(user);

      if (addedUser)
        sendResponse<Routes["/users"]["/"]["POST"]["CREATED"]>(
          res,
          StatusCodes.CREATED,
          addedUser
        );
      else
        sendResponse<Routes["/users"]["/"]["POST"]["CONFLICT"]>(
          res,
          StatusCodes.CONFLICT,
          buildErrorResponse(ErrorCode.UserAlreadyExists)
        );
    }),
    deleteUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const affectedRows = await service.deleteUser(email);

      sendResponse<Routes["/users"]["/:email"]["DELETE"]>(res, StatusCodes.OK, {
        affectedRows
      });
    }),
    getCompaniesByUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const options = assertDefined(req.getCompaniesByUserOptions);

      const companies = await companiesService.getCompanies({
        ...options,
        founderEmail: email
      });

      sendResponse<Routes["/users"]["/:email/companies"]["GET"]>(
        res,
        StatusCodes.OK,
        companies
      );
    }),
    getUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const user = await service.getUser(email);

      if (user)
        sendResponse<Routes["/users"]["/:email"]["GET"]["OK"]>(
          res,
          StatusCodes.OK,
          user
        );
      else
        sendResponse<Routes["/users"]["/:email"]["GET"]["NOT_FOUND"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.UserNotFound)
        );
    }),
    getUsers: wrapAsyncHandler(async (req, res) => {
      const options = assertDefined(req.getUsersOptions);

      const users = await service.getUsers(options);

      sendResponse<Routes["/users"]["/"]["GET"]>(res, StatusCodes.OK, users);
    }),
    updateUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const user = assertDefined(req.userUpdate);

      const updatedUser = await service.updateUser(email, user);

      if (updatedUser)
        sendResponse<Routes["/users"]["/:email"]["PUT"]["OK"]>(
          res,
          StatusCodes.OK,
          updatedUser
        );
      else
        sendResponse<Routes["/users"]["/:email"]["PUT"]["NOT_FOUND"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.UserNotFound)
        );
    })
  };
}
