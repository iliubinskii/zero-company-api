import { preprocessEmail } from "./common";
import zod from "zod";

export const JwtValidationSchema = zod
  // Do not use strictObject: JWT may contain additional fields
  .object({ email: preprocessEmail(zod.string().email()) });

export const JwtUserValidationSchema = zod.strictObject({
  admin: zod.boolean(),
  email: preprocessEmail(zod.string().email())
});
