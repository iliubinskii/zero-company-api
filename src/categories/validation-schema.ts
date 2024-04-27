import { Category } from "../schema";
import { MONGODB_MAX_LIMIT } from "../consts";
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
  limit: zod.preprocess(
    value => (typeof value === "string" ? Number.parseInt(value, 10) : value),
    zod.number().int().positive().max(MONGODB_MAX_LIMIT.categories).optional()
  ),
  offset: zod.preprocess(
    value => (typeof value === "string" ? Number.parseInt(value, 10) : value),
    zod.number().int().nonnegative().optional()
  )
});

export const GetCompaniesByCategoryOptionsValidationSchema = zod.strictObject({
  limit: zod.preprocess(
    value => (typeof value === "string" ? Number.parseInt(value, 10) : value),
    zod.number().int().positive().max(MONGODB_MAX_LIMIT.companies).optional()
  ),
  offset: zod.preprocess(
    value => (typeof value === "string" ? Number.parseInt(value, 10) : value),
    zod.number().int().nonnegative().optional()
  )
});

typeCheck({
  description: "",
  name: "",
  tagline: ""
});

/**
 * Type check
 * @param value - Value
 * @returns Value
 */
function typeCheck(
  value: zod.infer<typeof CategoryValidationSchema>
): Category {
  return value;
}
