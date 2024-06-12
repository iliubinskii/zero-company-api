import { ImageValidationSchema } from "./common";
import zod from "zod";

export const CompanyImageCreateValidationSchema = zod.object({
  image: ImageValidationSchema
});

export const CompanyImageUpdateValidationSchema = zod.object({
  image: ImageValidationSchema
});
