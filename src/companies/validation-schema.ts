import { preprocessBoolean, preprocessNumber } from "../utils";
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

const privateCompany = zod.boolean();

const targetValue = preprocessNumber(zod.number().int().positive());

const website = zod.string().url();

export const CompanyValidationSchema = zod.strictObject({
  categories,
  description,
  founders,
  images,
  logo,
  name,
  privateCompany: privateCompany.default(false),
  targetValue,
  website: website.optional()
});

export const CompanyUpdateValidationSchema = zod.strictObject({
  description: description.optional(),
  images: images.optional(),
  logo: logo.optional(),
  name: name.optional(),
  privateCompany: privateCompany.optional(),
  targetValue: targetValue.optional(),
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
