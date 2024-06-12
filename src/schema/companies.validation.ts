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
  founder,
  preprocessBoolean,
  preprocessDate,
  preprocessNumber
} from "./common";
import zod from "zod";

const _id = IdValidationSchema;

const addImages = zod.array(ImageValidationSchema);

const categories = zod.array(IdValidationSchema).nonempty().max(MAX_CATEGORIES);

const country = zod.string().length(COUNTRY_CODE_SIZE);

const createdAt = preprocessDate(zod.date());

const description = zod.string().min(1).nullable().optional();

const foundedAt = preprocessDate(zod.date()).nullable().optional();

const foundingAgreement = zod.string().min(1).nullable().optional();

const founders = zod.array(founder);

const images = zod.array(ImageValidationSchema);

const logo = ImageValidationSchema.nullable().optional();

const name = zod.string().min(1).nullable().optional();

const privateCompany = preprocessBoolean(zod.boolean()).nullable().optional();

const recommended = preprocessBoolean(zod.boolean()).nullable().optional();

const removeImages = zod.array(zod.string().min(1));

const status = zod.enum([CompanyStatus.draft, CompanyStatus.founded]);

const targetValue = preprocessNumber(zod.number().int().positive())
  .nullable()
  .optional();

const website = zod.string().url().nullable().optional();

export const ExistingCompanyValidationSchema = zod.object({
  _id,
  categories,
  country,
  createdAt,
  description,
  foundedAt,
  founders,
  foundingAgreement,
  images,
  logo,
  name,
  privateCompany,
  recommended,
  status,
  targetValue,
  website
});

export const CompanyCreateValidationSchema = zod.object({
  categories,
  country
});

export const CompanyUpdateValidationSchema = zod.object({
  addImages: addImages.optional(),
  categories: categories.optional(),
  description: description.optional(),
  founders: founders.optional(),
  logo: logo.optional(),
  name: name.optional(),
  privateCompany: privateCompany.optional(),
  removeImages: removeImages.optional(),
  targetValue: targetValue.optional(),
  website: website.optional()
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
