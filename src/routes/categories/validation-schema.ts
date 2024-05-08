import { CategoryCreate, CategoryUpdate } from "../../schema";
import { preprocessBoolean, preprocessNumber } from "../../utils";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import { MONGODB_MAX_LIMIT } from "../../consts";
import zod from "zod";

const description = zod.string().min(1);

const name = zod.string().min(1);

const tagline = zod.string().min(1);

export const CategoryCreateValidationSchema = zod.strictObject({
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
  cursor: zod.string().min(1).optional(),
  founderEmail: zod.string().min(1).optional(),
  includePrivateCompanies: preprocessBoolean(zod.boolean().optional()),
  limit: preprocessNumber(
    zod.number().int().positive().max(MONGODB_MAX_LIMIT.companies).optional()
  ),
  offset: preprocessNumber(zod.number().int().nonnegative().optional()),
  onlyRecommended: preprocessBoolean(zod.boolean().optional()),
  sortBy: zod.union([zod.literal("foundedAt"), zod.literal("name")]).optional(),
  sortOrder: zod.union([zod.literal("asc"), zod.literal("desc")]).optional()
});

// Type check the category create validation schema
((): Equals<
  keyof zod.infer<typeof CategoryCreateValidationSchema>,
  keyof CategoryCreate
> => 1)();

// Type check the category update validation schema
((): Equals<
  keyof zod.infer<typeof CategoryUpdateValidationSchema>,
  keyof CategoryUpdate
> => 1)();
