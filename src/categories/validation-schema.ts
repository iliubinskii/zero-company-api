import { t } from "i18next";
import zod from "zod";

const description = zod.string().min(1, t("DescriptionIsRequired"));

const name = zod.string().min(1, t("NameIsRequired"));

const tagline = zod.string().min(1, t("TaglineIsRequired"));

export const CategoryValidationSchema = zod.object({
  description,
  name,
  tagline
});

export const CategoryUpdateValidationSchema = zod.object({
  description: description.optional(),
  name: name.optional(),
  tagline: tagline.optional()
});
