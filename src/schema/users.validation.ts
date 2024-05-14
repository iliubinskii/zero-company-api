import { ExistingUser, UserCreate, UserUpdate } from "./users";
import {
  IdValidationSchema,
  preprocessBoolean,
  preprocessEmail
} from "./common";
import { Equals } from "ts-toolbelt/out/Any/Equals";
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

// Type check the user create validation schema
((): Equals<
  keyof zod.infer<typeof ExistingUserValidationSchema>,
  keyof ExistingUser
> => 1)();

// Type check the user create validation schema
((): Equals<
  keyof zod.infer<typeof UserCreateValidationSchema>,
  keyof UserCreate
> => 1)();

// Type check the user update validation schema
((): Equals<
  keyof zod.infer<typeof UserUpdateValidationSchema>,
  keyof UserUpdate
> => 1)();
