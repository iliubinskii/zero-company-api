export interface User {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface UserCreate extends User {}

export interface UserUpdate extends Partial<Omit<User, "email">> {}

export type Users = readonly User[];

export interface ExistingUser extends User {
  readonly _id: string;
}

export type ExistingUsers = readonly ExistingUser[];

export interface GetUsersResponse {
  readonly docs: ExistingUsers;
  readonly total: number;
}
