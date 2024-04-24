import { t } from "i18next";
import zod from "zod";

const header = zod.string().min(1, t("NameIsRequired"));

const images = zod.array(zod.string().min(1, t("NameIsRequired")));

const logo = zod.string().min(1, t("NameIsRequired"));

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
