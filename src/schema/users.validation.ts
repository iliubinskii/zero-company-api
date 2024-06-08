import type {
  AuthUser,
  AuthUserEssential,
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

const admin = preprocessBoolean(zod.boolean());

const email = preprocessEmail(zod.string().email());

const firstName = zod.string().min(1);

const lastName = zod.string().min(1);

export const ExistingUserValidationSchema = zod.strictObject({
  _id,
  email,
  firstName,
  lastName
});

export const AuthUserValidationSchema = zod.strictObject({
  admin,
  email,
  user: ExistingUserValidationSchema.optional()
});

export const AuthUserEssentialValidationSchema = zod.strictObject({
  admin,
  email,
  user: ExistingUserValidationSchema.pick({
    firstName: true,
    lastName: true
  }).optional()
});

// Do not use strictObject: JWT may contain additional fields
export const JwtValidationSchema = zod.object({ email });

export const UserCreateValidationSchema = ExistingUserValidationSchema.omit({
  _id: true,
  email: true
});

export const UserUpdateValidationSchema = zod.strictObject({
  firstName: firstName.optional(),
  lastName: lastName.optional()
});

// Type check the existing user validation schema
((): ExistingUser | undefined => {
  const result = ExistingUserValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the jwt user validation schema
((): AuthUser | undefined => {
  const result = AuthUserValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the jwt user validation schema
((): AuthUserEssential | undefined => {
  const result = AuthUserEssentialValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the jwt validation schema
((): Jwt | undefined => {
  const result = JwtValidationSchema.safeParse(undefined);

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
