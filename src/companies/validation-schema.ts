import { Company } from "../schema";
import { t } from "i18next";
import zod from "zod";

const categories = zod.array(zod.string()).min(1, t("CategoriesAreRequired"));

const header = zod.string().min(1, t("HeaderIsRequired"));

const images = zod
  .array(zod.string().min(1, t("ImagesAreRequired")))
  .min(1, t("ImagesAreRequired"));

const logo = zod.string().min(1, t("LogoIsRequired"));

const name = zod.string().min(1, t("NameIsRequired"));

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
