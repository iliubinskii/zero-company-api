import { MONGODB_MAX_LIMIT } from "../consts";
import zod from "zod";

const founder = zod.object({
  confirmed: zod.boolean(),
  email: zod.string().email(),
  share: zod.number().int().positive()
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

const discoverable = zod.boolean();

const targetValue = zod.number().int().positive();

const website = zod.string();

export const CompanyValidationSchema = zod.strictObject({
  categories,
  description,
  discoverable,
  founders,
  images,
  logo,
  name,
  targetValue,
  website
});

export const CompanyUpdateValidationSchema = zod.strictObject({
  description: description.optional(),
  discoverable: discoverable.optional(),
  images: images.optional(),
  logo: logo.optional(),
  name: name.optional(),
  targetValue: targetValue.optional(),
  website: website.optional()
});

export const GetCompaniesOptionsValidationSchema = zod.strictObject({
  category: zod.string().min(1).optional(),
  founder: zod.string().min(1).optional(),
  limit: zod.preprocess(
    value => (typeof value === "string" ? Number.parseInt(value, 10) : value),
    zod.number().int().positive().max(MONGODB_MAX_LIMIT.companies).optional()
  ),
  offset: zod.preprocess(
    value => (typeof value === "string" ? Number.parseInt(value, 10) : value),
    zod.number().int().nonnegative().optional()
  )
});
