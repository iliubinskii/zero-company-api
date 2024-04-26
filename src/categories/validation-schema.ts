import { Category } from "../schema";
import { lang } from "../langs";
import zod from "zod";

const description = zod.string().min(1, lang.DescriptionIsRequired);

const name = zod.string().min(1, lang.NameIsRequired);

const tagline = zod.string().min(1, lang.TaglineIsRequired);

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

/**
 * Type check
 * @param value - Value
 * @returns Value
 */
export function typeCheck(
  value: zod.infer<typeof CategoryValidationSchema>
): Category {
  return value;
}
