import type {
  CategoryCreate,
  CategoryUpdate,
  ExistingCategory
} from "./categories";
import { IdValidationSchema, preprocessBoolean } from "./common";
import zod from "zod";

export const ExistingCategoryValidationSchema = zod.object({
  _id: IdValidationSchema,
  description: zod.string().min(1),
  name: zod.string().min(1),
  pinned: preprocessBoolean(zod.boolean()),
  tagline: zod.string().min(1)
});

export const CategoryCreateValidationSchema =
  ExistingCategoryValidationSchema.pick({
    description: true,
    name: true,
    pinned: true,
    tagline: true
  });

export const CategoryUpdateValidationSchema =
  ExistingCategoryValidationSchema.pick({
    description: true,
    name: true,
    pinned: true,
    tagline: true
  }).partial();

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
