import { ExistingUser, Jwt, JwtUser, UserCreate, UserUpdate } from "./users";
import {
  IdValidationSchema,
  ValidationResult,
  preprocessBoolean,
  preprocessEmail
} from "./common";
import _ from "lodash";
import zod from "zod";

const _id = IdValidationSchema;

const admin = preprocessBoolean(zod.boolean());

const email = preprocessEmail(zod.string().email());

const firstName = zod.string().min(1);

const lastName = zod.string().min(1);

const fields = {
  _id,
  email,
  firstName,
  lastName
};

export const ExistingUserValidationSchema = zod.strictObject(fields);

// Do not use strictObject: JWT may contain additional fields
export const JwtValidationSchema = zod.object({ email });

export const JwtUserValidationSchema = zod.strictObject({
  admin,
  email,
  user: ExistingUserValidationSchema.optional()
});

export const UserCreateValidationSchema = zod.strictObject(
  _.omit(fields, "_id", "email")
);

export const UserUpdateValidationSchema = zod.strictObject({
  firstName: firstName.optional(),
  lastName: lastName.optional()
});

// Type check the existing user validation schema
((): ValidationResult<ExistingUser> | undefined => {
  const result = ExistingUserValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the jwt validation schema
((): ValidationResult<Jwt> | undefined => {
  const result = JwtValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the jwt user validation schema
((): ValidationResult<JwtUser> | undefined => {
  const result = JwtUserValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the user create validation schema
((): ValidationResult<UserCreate> | undefined => {
  const result = UserCreateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the user update validation schema
((): ValidationResult<UserUpdate> | undefined => {
  const result = UserUpdateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();
