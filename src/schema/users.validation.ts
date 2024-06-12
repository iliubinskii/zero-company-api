import type {
  AuthUser,
  ExistingUser,
  Jwt,
  UserCreate,
  UserUpdate
} from "./users";
import {
  IdValidationSchema,
  preprocessBoolean,
  preprocessEmail
} from "./common";
import zod from "zod";

const _id = IdValidationSchema;

const addFavoriteCompanies = zod.array(zod.string().min(1));

const admin = preprocessBoolean(zod.boolean());

const email = preprocessEmail(zod.string().email());

const favoriteCompanies = zod.array(zod.string().min(1));

const firstName = zod.string().min(1).nullable().optional();

const lastName = zod.string().min(1).nullable().optional();

const removeFavoriteCompanies = zod.array(zod.string().min(1));

export const AuthUserValidationSchema = zod.object({ admin, email });

export const JwtValidationSchema = zod.object({ email });

export const ExistingUserValidationSchema = zod.object({
  _id,
  email,
  favoriteCompanies,
  firstName,
  lastName
});

export const UserCreateValidationSchema = zod.object({
  firstName,
  lastName
});

export const UserUpdateValidationSchema = zod.object({
  addFavoriteCompanies: addFavoriteCompanies.optional(),
  firstName: firstName.optional(),
  lastName: lastName.optional(),
  removeFavoriteCompanies: removeFavoriteCompanies.optional()
});

// Type check the existing user validation schema
((): ExistingUser | undefined => {
  const result = ExistingUserValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check auth user validation schema
((): AuthUser | undefined => {
  const result = AuthUserValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the jwt validation schema
((): Jwt | undefined => {
  const result = JwtValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check existing user validation schema
((): ExistingUser | undefined => {
  const result = ExistingUserValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the user create validation schema
((): UserCreate | undefined => {
  const result = UserCreateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the user update validation schema
((): UserUpdate | undefined => {
  const result = UserUpdateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();
