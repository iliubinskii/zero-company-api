import { Company } from "../schema";
import { lang } from "../langs";
import zod from "zod";

const categories = zod.array(zod.string()).min(1, lang.CategoriesAreRequired);

const header = zod.string().min(1, lang.HeaderIsRequired);

const images = zod
  .array(zod.string().min(1, lang.ImagesAreRequired))
  .min(1, lang.ImagesAreRequired);

const logo = zod.string().min(1, lang.LogoIsRequired);

const name = zod.string().min(1, lang.NameIsRequired);

export const CompanyValidationSchema = zod.strictObject({
  categories,
  header,
  images,
  logo,
  name
});

export const CompanyUpdateValidationSchema = zod.strictObject({
  categories: categories.optional(),
  header: header.optional(),
  images: images.optional(),
  logo: logo.optional(),
  name: name.optional()
});

/**
 * Type check
 * @param value - Value
 * @returns Value
 */
export function typeCheck(
  value: zod.infer<typeof CompanyValidationSchema>
): Company {
  return value;
}
