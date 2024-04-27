import { Company } from "../schema";
import { MONGODB_MAX_LIMIT } from "../consts";
import zod from "zod";

const categories = zod.array(zod.string().min(1)).nonempty();

const header = zod.string().min(1);

const images = zod.array(zod.string().min(1)).nonempty();

const logo = zod.string().min(1);

const name = zod.string().min(1);

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

export const GetCompaniesOptionsValidationSchema = zod.strictObject({
  category: zod.string().min(1).optional(),
  limit: zod.preprocess(
    value => (typeof value === "string" ? Number.parseInt(value, 10) : value),
    zod.number().int().positive().max(MONGODB_MAX_LIMIT.companies).optional()
  ),
  offset: zod.preprocess(
    value => (typeof value === "string" ? Number.parseInt(value, 10) : value),
    zod.number().int().nonnegative().optional()
  )
});

typeCheck({
  categories: [""],
  header: "",
  images: [""],
  logo: "",
  name: ""
});

/**
 * Type check
 * @param value - Value
 * @returns Value
 */
function typeCheck(value: zod.infer<typeof CompanyValidationSchema>): Company {
  return value;
}
