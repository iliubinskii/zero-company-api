import { ExistingUser, UserCreate, UserUpdate } from "./users";
import { IdValidationSchema, preprocessEmail } from "./common";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import _ from "lodash";
import zod from "zod";

const _id = IdValidationSchema;

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
