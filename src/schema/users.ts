import type { MultipleDocsResponse, Update } from "./common";

export interface AuthUser {
  readonly admin: boolean;
  readonly email: string;
  readonly user?: ExistingUser | undefined;
}

// Being sent in a query string, keep short
export interface AuthUserEssential {
  readonly admin: boolean;
  readonly email: string;
  readonly user?:
    | {
        readonly firstName: string;
        readonly lastName: string;
      }
    | undefined;
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
  readonly firstName: string;
  readonly lastName: string;
}

export interface UserCreate extends Pick<User, "firstName" | "lastName"> {}

export interface UserUpdate
  extends Update<Pick<User, "firstName" | "lastName">> {
  readonly addFavoriteCompanies?: readonly string[] | null | undefined;
  readonly removeFavoriteCompanies?: readonly string[] | null | undefined;
}
