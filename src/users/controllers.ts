import { CompaniesService, UserControllers, UsersService } from "../types";
import { assertDefined, buildErrorResponse } from "../utils";
import { ErrorCode } from "../schema";
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
    addUser: async (req, res, next) => {
      try {
        const user = assertDefined(req.user);

        const addedUser = await service.addUser(user);

        if (addedUser) res.status(StatusCodes.CREATED).json(addedUser);
        else
          res
            .status(StatusCodes.CONFLICT)
            .json(buildErrorResponse(ErrorCode.UserAlreadyExists));
      } catch (err) {
        next(err);
      }
    },
    deleteUser: async (req, res, next) => {
      try {
        const email = assertDefined(req.params["email"]);

        const affectedRows = await service.deleteUser(email);

        res.status(StatusCodes.OK).send({ affectedRows });
      } catch (err) {
        next(err);
      }
    },
    getCompaniesByUser: async (req, res, next) => {
      try {
        const email = assertDefined(req.params["email"]);

        const options = assertDefined(req.getCompaniesByUserOptions);

        const companies = await companiesService.getCompanies({
          ...options,
          founderEmail: email
        });

        res.json(companies);
      } catch (err) {
        next(err);
      }
    },
    getUser: async (req, res, next) => {
      try {
        const email = assertDefined(req.params["email"]);

        const user = await service.getUser(email);

        if (user) res.json(user);
        else
          res
            .status(StatusCodes.NOT_FOUND)
            .json(buildErrorResponse(ErrorCode.UserNotFound));
      } catch (err) {
        next(err);
      }
    },
    getUsers: async (req, res, next) => {
      try {
        const options = assertDefined(req.getUsersOptions);

        const users = await service.getUsers(options);

        res.json(users);
      } catch (err) {
        next(err);
      }
    },
    updateUser: async (req, res, next) => {
      try {
        const email = assertDefined(req.params["email"]);

        const user = assertDefined(req.userUpdate);

        const updatedUser = await service.updateUser(email, user);

        if (updatedUser) res.status(StatusCodes.OK).json(updatedUser);
        else
          res
            .status(StatusCodes.NOT_FOUND)
            .json(buildErrorResponse(ErrorCode.UserNotFound));
      } catch (err) {
        next(err);
      }
    }
  };
}
