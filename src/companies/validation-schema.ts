import { t } from "i18next";
import zod from "zod";

const name = zod.string().min(1, t("NameIsRequired"));

export const CompanyValidationSchema = zod.object({
  name
});

export const CompanyUpdateValidationSchema = zod.object({
  name: name.optional()
});
