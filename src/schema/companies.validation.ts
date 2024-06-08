import { COUNTRY_CODE_SIZE, MAX_CATEGORIES } from "./consts";
import {
  type CompanyCreate,
  type CompanyUpdate,
  type ExistingCompany
} from "./companies";
import {
  CompanyStatus,
  IdValidationSchema,
  ImageValidationSchema,
  preprocessBoolean,
  preprocessEmail,
  preprocessNumber
} from "./common";
import zod from "zod";

const _id = IdValidationSchema;

const categories = zod
  .array(IdValidationSchema)
  .nonempty()
  .min(1)
  .max(MAX_CATEGORIES);

const country = zod.string().length(COUNTRY_CODE_SIZE);

const createdAt = zod.date();

const description = zod.string().min(1).optional();

const foundedAt = zod.date().optional();

const founder = zod.strictObject({
  email: preprocessEmail(zod.string().email()),
  firstName: zod.string().min(1).optional(),
  lastName: zod.string().min(1).optional(),
  share: preprocessNumber(zod.number().int().positive()).optional()
});

const founders = zod.array(founder);

const images = zod.array(ImageValidationSchema);

const logo = ImageValidationSchema.optional();

const name = zod.string().min(1).optional();

const privateCompany = preprocessBoolean(zod.boolean()).optional();

const recommended = preprocessBoolean(zod.boolean()).optional();

const status = zod.enum([
  CompanyStatus.draft,
  CompanyStatus.founded,
  CompanyStatus.signing
]);

const targetValue = preprocessNumber(zod.number().int().positive()).optional();

const website = zod.string().url().optional();

export const ExistingCompanyValidationSchema = zod.strictObject({
  _id,
  categories,
  country,
  createdAt,
  description,
  foundedAt,
  founders,
  images,
  logo,
  name,
  privateCompany,
  recommended,
  status,
  targetValue,
  website
});

export const CompanyCreateValidationSchema = zod.strictObject({
  categories,
  country
});

export const CompanyUpdateValidationSchema = zod.strictObject({
  description: description.optional(),
  founders: founders.optional(),
  images: images.optional(),
  logo: logo.optional(),
  name: name.optional(),
  privateCompany: privateCompany.nullable().optional(),
  website: website.nullable().optional()
});

// Type check the existing company validation schema
((): ExistingCompany | undefined => {
  const result = ExistingCompanyValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the company create validation schema
((): CompanyCreate | undefined => {
  const result = CompanyCreateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the company update validation schema
((): CompanyUpdate | undefined => {
  const result = CompanyUpdateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();
