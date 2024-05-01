import {
  ExistingUser,
  GetUsersResponse,
  UserCreate,
  UserUpdate
} from "../schema";
import { RequestHandler } from "express";

export interface UserControllers {
  readonly addUser: RequestHandler;
  readonly deleteUser: RequestHandler;
  readonly getCompaniesByUser: RequestHandler;
  readonly getUser: RequestHandler;
  readonly getUsers: RequestHandler;
  readonly updateUser: RequestHandler;
}

export interface UsersMiddleware {
  readonly requireValidGetCompaniesByUserOptions: RequestHandler;
  readonly requireValidGetUsersOptions: RequestHandler;
  readonly requireValidMeUser: RequestHandler;
  readonly requireValidUser: RequestHandler;
  readonly requireValidUserUpdate: RequestHandler;
  readonly userEmailFromJwtUser: RequestHandler;
  readonly userEmailFromQuery: RequestHandler;
}

export interface UsersService {
  /**
   * Adds a user to the database.
   * @param user - The user to add.
   * @returns A promise that resolves when the user has been added.
   */
  readonly addUser: (user: UserCreate) => Promise<ExistingUser | undefined>;
  /**
   * Deletes a user from the database.
   * @param email - The e-mail of the user to delete.
   * @returns A promise that resolves with the number of affected rows.
   */
  readonly deleteUser: (email: string) => Promise<number>;
  /**
   * Gets a user from the database.
   * @param email - The e-mail of the user to get.
   * @returns A promise that resolves with the user, or `undefined` if the user was not found.
   */
  readonly getUser: (email: string) => Promise<ExistingUser | undefined>;
  /**
   * Gets all users from the database.
   * @param options - The options to use when getting users.
   * @returns A promise that resolves with all users in the database.
   */
  readonly getUsers: (options?: GetUsersOptions) => Promise<GetUsersResponse>;
  /**
   * Updates a user in the database.
   * @param email - The e-mail of the user to update.
   * @param user - The user data to update.
   * @returns A promise that resolves with the updated user, or `undefined` if the user was not found.
   */
  readonly updateUser: (
    email: string,
    user: UserUpdate
  ) => Promise<ExistingUser | undefined>;
}

export interface GetUsersOptions {
  readonly limit?: number;
  readonly offset?: number;
}

export interface GetCompaniesByUserOptions {
  readonly limit?: number;
  readonly offset?: number;
}
