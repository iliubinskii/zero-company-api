import type {
  CategoryCreate,
  CategoryUpdate,
  ExistingCategory
} from "./categories";
import { IdValidationSchema, preprocessBoolean } from "./common";
import type { ValidationResult } from "./common";
import zod from "zod";

const _id = IdValidationSchema;

const description = zod.string().min(1);

const name = zod.string().min(1);

const pinned = preprocessBoolean(zod.boolean());

const tagline = zod.string().min(1);

const fields = {
  _id,
  description,
  name,
  pinned,
  tagline
};

export const ExistingCategoryValidationSchema = zod.strictObject(fields);

export const CategoryCreateValidationSchema =
  ExistingCategoryValidationSchema.omit({ _id: true });

export const CategoryUpdateValidationSchema = zod.strictObject({
  description: description.optional(),
  name: name.optional(),
  pinned: pinned.optional(),
  tagline: tagline.optional()
});

// Type check the existing category validation schema
((): ValidationResult<ExistingCategory> | undefined => {
  const result = ExistingCategoryValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the category create validation schema
((): ValidationResult<CategoryCreate> | undefined => {
  const result = CategoryCreateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the category update validation schema
((): ValidationResult<CategoryUpdate> | undefined => {
  const result = CategoryUpdateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();
