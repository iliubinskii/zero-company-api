import { CompaniesService, UserControllers, UsersService } from "../../types";
import {
  assertDefined,
  buildErrorResponse,
  wrapAsyncHandler
} from "../../utils";
import { ErrorCode } from "../../schema";
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

      if (addedUser) res.status(StatusCodes.CREATED).json(addedUser);
      else
        res
          .status(StatusCodes.CONFLICT)
          .json(buildErrorResponse(ErrorCode.UserAlreadyExists));
    }),
    deleteUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const affectedRows = await service.deleteUser(email);

      res.status(StatusCodes.OK).send({ affectedRows });
    }),
    getCompaniesByUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const options = assertDefined(req.getCompaniesByUserOptions);

      const companies = await companiesService.getCompanies({
        ...options,
        founderEmail: email
      });

      res.json(companies);
    }),
    getUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const user = await service.getUser(email);

      if (user) res.json(user);
      else
        res
          .status(StatusCodes.NOT_FOUND)
          .json(buildErrorResponse(ErrorCode.UserNotFound));
    }),
    getUsers: wrapAsyncHandler(async (req, res) => {
      const options = assertDefined(req.getUsersOptions);

      const users = await service.getUsers(options);

      res.json(users);
    }),
    updateUser: wrapAsyncHandler(async (req, res) => {
      const email = assertDefined(req.userEmail);

      const user = assertDefined(req.userUpdate);

      const updatedUser = await service.updateUser(email, user);

      if (updatedUser) res.status(StatusCodes.OK).json(updatedUser);
      else
        res
          .status(StatusCodes.NOT_FOUND)
          .json(buildErrorResponse(ErrorCode.UserNotFound));
    })
  };
}
