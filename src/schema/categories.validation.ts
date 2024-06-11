import type {
  CategoryCreate,
  CategoryUpdate,
  ExistingCategory
} from "./categories";
import { IdValidationSchema, preprocessBoolean } from "./common";
import zod from "zod";

const _id = IdValidationSchema;

const description = zod.string().min(1);

const name = zod.string().min(1);

const pinned = preprocessBoolean(zod.boolean());

const tagline = zod.string().min(1);

export const ExistingCategoryValidationSchema = zod.strictObject({
  _id,
  description,
  name,
  pinned,
  tagline
});

export const CategoryCreateValidationSchema = zod.strictObject({
  description,
  name,
  pinned,
  tagline
});

export const CategoryUpdateValidationSchema = zod.strictObject({
  description: description.optional(),
  name: name.optional(),
  pinned: pinned.optional(),
  tagline: tagline.optional()
});

// Type check the existing category validation schema
((): ExistingCategory | undefined => {
  const result = ExistingCategoryValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the category create validation schema
((): CategoryCreate | undefined => {
  const result = CategoryCreateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the category update validation schema
((): CategoryUpdate | undefined => {
  const result = CategoryUpdateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();
