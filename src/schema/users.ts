import type { Update } from "./common";

export interface ExistingUser extends User {
  readonly _id: string;
}

export interface Jwt {
  readonly email: string;
}

export interface JwtUser {
  readonly admin: boolean;
  readonly email: string;
  readonly user?: ExistingUser;
}

export interface User {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface UserCreate extends Omit<User, "email"> {}

export interface UserUpdate extends Update<Omit<User, "email">> {}
