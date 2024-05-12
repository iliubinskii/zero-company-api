import { CategoryCreate, CategoryUpdate, ExistingCategory } from "./categories";
import { IdValidationSchema, preprocessBoolean } from "./common";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import _ from "lodash";
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

export const CategoryCreateValidationSchema = zod.strictObject(
  _.omit(fields, "_id")
);

export const CategoryUpdateValidationSchema = zod.strictObject({
  description: description.optional(),
  name: name.optional(),
  pinned: pinned.optional(),
  tagline: tagline.optional()
});

// Type check the category create validation schema
((): Equals<
  keyof zod.infer<typeof ExistingCategoryValidationSchema>,
  keyof ExistingCategory
> => 1)();

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
