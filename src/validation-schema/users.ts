import { UserCreate, UserUpdate } from "../schema";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import { preprocessEmail } from "../utils";
import zod from "zod";

const email = preprocessEmail(zod.string().email());

const firstName = zod.string().min(1);

const lastName = zod.string().min(1);

export const UserCreateValidationSchema = zod.strictObject({
  email,
  firstName,
  lastName
});

export const UserUpdateValidationSchema = zod.strictObject({
  firstName: firstName.optional(),
  lastName: lastName.optional()
});

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