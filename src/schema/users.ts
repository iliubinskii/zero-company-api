import type { MultipleDocsResponse, Update } from "./common";

export interface AuthUser {
  readonly admin: boolean;
  readonly email: string;
}

export interface ExistingUser extends User {
  readonly _id: string;
}

export type ExistingUsers = MultipleDocsResponse<ExistingUser>;

export interface Jwt {
  readonly email: string;
}

export interface User {
  readonly email: string;
  readonly favoriteCompanies: readonly string[];
  readonly firstName?: string | null | undefined;
  readonly lastName?: string | null | undefined;
}

export interface UserCreate extends Pick<User, "firstName" | "lastName"> {}

export interface UserUpdate
  extends Update<Pick<User, "firstName" | "lastName">> {
  readonly addFavoriteCompanies?: readonly string[] | null | undefined;
  readonly removeFavoriteCompanies?: readonly string[] | null | undefined;
}
