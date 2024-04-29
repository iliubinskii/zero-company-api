import { CompanyCreate, CompanyUpdate } from "../schema";
import { preprocessBoolean, preprocessNumber } from "../utils";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import { MONGODB_MAX_LIMIT } from "../consts";
import zod from "zod";

const founder = zod.object({
  confirmed: preprocessBoolean(zod.boolean()),
  email: zod.string().email(),
  share: preprocessNumber(zod.number().int().positive())
});

const webAccessibleImage = zod.object({
  assetId: zod.string().min(1),
  height: zod.number().int().positive(),
  secureUrl: zod.string().min(1),
  url: zod.string().min(1),
  width: zod.number().int().positive()
});

const categories = zod.array(zod.string().min(1)).nonempty().max(2);

const description = zod.string().min(1);

const founders = zod.array(founder).nonempty();

const images = zod.array(webAccessibleImage).nonempty();

const logo = webAccessibleImage;

const name = zod.string().min(1);

const privateCompany = preprocessBoolean(zod.boolean());

const targetValue = preprocessNumber(zod.number().int().positive());

const website = zod.union([zod.string().url(), zod.null()]);

export const CompanyCreateValidationSchema = zod.strictObject({
  categories,
  description,
  founders,
  images,
  logo,
  name,
  privateCompany: privateCompany.default(false),
  targetValue,
  website: website.default(null)
});

export const CompanyUpdateValidationSchema = zod.strictObject({
  description: description.optional(),
  images: images.optional(),
  logo: logo.optional(),
  name: name.optional(),
  privateCompany: privateCompany.optional(),
  website: website.optional()
});

export const GetCompaniesOptionsValidationSchema = zod.strictObject({
  category: zod.string().min(1).optional(),
  founder: zod.string().min(1).optional(),
  limit: preprocessNumber(
    zod.number().int().positive().max(MONGODB_MAX_LIMIT.companies).optional()
  ),
  offset: preprocessNumber(zod.number().int().nonnegative().optional())
});

// Type check the company create validation schema
((): Equals<
  keyof zod.infer<typeof CompanyCreateValidationSchema>,
  keyof CompanyCreate
> => {
  return 1;
})();

// Type check the company update validation schema
((): Equals<
  keyof zod.infer<typeof CompanyUpdateValidationSchema>,
  keyof CompanyUpdate
> => {
  return 1;
})();
