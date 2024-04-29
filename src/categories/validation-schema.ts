import { MONGODB_MAX_LIMIT } from "../consts";
import { preprocessNumber } from "../utils";
import zod from "zod";

const description = zod.string().min(1);

const name = zod.string().min(1);

const tagline = zod.string().min(1);

export const CategoryValidationSchema = zod.strictObject({
  description,
  name,
  tagline
});

export const CategoryUpdateValidationSchema = zod.strictObject({
  description: description.optional(),
  name: name.optional(),
  tagline: tagline.optional()
});

export const GetCategoriesOptionsValidationSchema = zod.strictObject({
  limit: preprocessNumber(
    zod.number().int().positive().max(MONGODB_MAX_LIMIT.categories).optional()
  ),
  offset: preprocessNumber(zod.number().int().nonnegative().optional())
});

export const GetCompaniesByCategoryOptionsValidationSchema = zod.strictObject({
  limit: preprocessNumber(
    zod.number().int().positive().max(MONGODB_MAX_LIMIT.companies).optional()
  ),
  offset: preprocessNumber(zod.number().int().nonnegative().optional())
});
