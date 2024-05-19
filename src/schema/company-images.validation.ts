import { ImageValidationSchema } from "./common";
import zod from "zod";

export const CompanyImageCreateValidationSchema = zod.strictObject({
  image: ImageValidationSchema
});

export const CompanyImageUpdateValidationSchema = zod.strictObject({
  image: ImageValidationSchema
});
