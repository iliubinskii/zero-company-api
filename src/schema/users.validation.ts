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

export const AuthUserValidationSchema = zod.object({
  admin: preprocessBoolean(zod.boolean()),
  email: preprocessEmail(zod.string().email())
});

export const JwtValidationSchema = zod.object({
  email: preprocessEmail(zod.string().email())
});

export const ExistingUserValidationSchema = zod.object({
  _id: IdValidationSchema,
  email: preprocessEmail(zod.string().email()),
  favoriteCompanies: zod.array(zod.string().min(1)),
  firstName: zod.string().min(1).nullable().optional(),
  lastName: zod.string().min(1).nullable().optional()
});

export const UserCreateValidationSchema = ExistingUserValidationSchema.pick({
  firstName: true,
  lastName: true
});

export const UserUpdateValidationSchema = ExistingUserValidationSchema.pick({
  firstName: true,
  lastName: true
})
  .partial()
  .extend({
    addFavoriteCompanies: zod.array(zod.string().min(1)).optional(),
    removeFavoriteCompanies: zod.array(zod.string().min(1)).optional()
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
