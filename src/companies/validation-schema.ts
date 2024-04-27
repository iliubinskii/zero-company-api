import { Company } from "../schema";
import { MONGODB_MAX_LIMIT } from "../consts";
import zod from "zod";

const webAccessibleImage = zod.object({
  assetId: zod.string().min(1),
  height: zod.number().int().positive(),
  secureUrl: zod.string().min(1),
  url: zod.string().min(1),
  width: zod.number().int().positive()
});

const categories = zod.array(zod.string().min(1)).nonempty();

const header = webAccessibleImage;

const images = zod.array(webAccessibleImage).nonempty();

const logo = webAccessibleImage;

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
  header: {
    assetId: "",
    height: 0,
    secureUrl: "",
    url: "",
    width: 0
  },
  images: [
    {
      assetId: "",
      height: 0,
      secureUrl: "",
      url: "",
      width: 0
    }
  ],
  logo: {
    assetId: "",
    height: 0,
    secureUrl: "",
    url: "",
    width: 0
  },
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
