import { t } from "i18next";
import zod from "zod";

const header = zod.string().min(1, t("HeaderIsRequired"));

const images = zod
  .array(zod.string().min(1, t("ImagesAreRequired")))
  .min(1, t("ImagesAreRequired"));

const logo = zod.string().min(1, t("LogoIsRequired"));

const name = zod.string().min(1, t("NameIsRequired"));

export const CompanyValidationSchema = zod.object({
  header,
  images,
  logo,
  name
});

export const CompanyUpdateValidationSchema = zod.object({
  header: header.optional(),
  images: images.optional(),
  logo: logo.optional(),
  name: name.optional()
});
