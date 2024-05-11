export interface User {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface UserCreate extends Omit<User, "email"> {}

export interface UserUpdate extends Partial<Omit<User, "email">> {}

export type Users = readonly User[];

export interface ExistingUser extends User {
  readonly _id: string;
}

export type ExistingUsers = readonly ExistingUser[];
