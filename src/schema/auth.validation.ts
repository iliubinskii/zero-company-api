import { preprocessEmail } from "./common";
import zod from "zod";

const admin = zod.boolean();

const email = preprocessEmail(zod.string().email());

// Do not use strictObject: JWT may contain additional fields
export const JwtValidationSchema = zod.object({ email });

export const JwtUserValidationSchema = zod.strictObject({ admin, email });
