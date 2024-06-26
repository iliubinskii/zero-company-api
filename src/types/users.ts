import type {
  ExistingUser,
  GetUsersOptions,
  MultipleDocsResponse,
  User,
  UserUpdate
} from "../schema";
import type { RequestHandler } from "express";
import type mongoose from "mongoose";

export interface UserControllers {
  readonly addUser: RequestHandler;
  readonly deleteUser: RequestHandler;
  readonly getCompaniesByUser: RequestHandler;
  readonly getDocumentsByUser: RequestHandler;
  readonly getFavoriteCompaniesByUser: RequestHandler;
  readonly getUser: RequestHandler;
  readonly getUsers: RequestHandler;
  readonly updateUser: RequestHandler;
}

export interface UsersMiddleware {
  readonly userRefFromIdParam: RequestHandler;
  readonly userRefFromJwt: RequestHandler;
}

export type UserRef =
  | {
      readonly id: string;
      readonly type: "id";
    }
  | {
      readonly email: string;
      readonly type: "email";
    };

export interface UsersService {
  /**
   * Adds a user to the database.
   * @param user - The user to add.
   * @returns A promise that resolves when the user has been added.
   */
  readonly addUser: (user: User) => Promise<RawExistingUser | null>;
  /**
   * Deletes a user from the database.
   * @param ref - The reference of the user to delete.
   * @returns A promise that resolves with the number of affected rows.
   */
  readonly deleteUser: (ref: UserRef) => Promise<number>;
  /**
   * Gets a user from the database.
   * @param ref - The reference of the user to get.
   * @returns A promise that resolves with the user, or `null` if the user was not found.
   */
  readonly getUser: (ref: UserRef) => Promise<RawExistingUser | null>;
  /**
   * Gets all users from the database.
   * @param options - The options to use when getting users.
   * @returns A promise that resolves with all users in the database.
   */
  readonly getUsers: (options?: GetUsersOptions) => Promise<RawExistingUsers>;
  /**
   * Updates a user in the database.
   * @param ref - The reference of the user to update.
   * @param user - The user data to update.
   * @returns A promise that resolves with the updated user, or `null` if the user was not found.
   */
  readonly updateUser: (
    ref: UserRef,
    user: UserUpdate
  ) => Promise<RawExistingUser | null>;
}

export interface RawExistingUser
  extends Omit<ExistingUser, "_id" | "favoriteCompanies"> {
  readonly _id: mongoose.Types.ObjectId;
  readonly favoriteCompanies: readonly mongoose.Types.ObjectId[];
}

export type RawExistingUsers = MultipleDocsResponse<RawExistingUser>;
