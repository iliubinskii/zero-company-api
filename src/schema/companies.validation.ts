import {
  COUNTRY_CODE_SIZE,
  CompanyStatus,
  FounderValidationSchema,
  IdValidationSchema,
  ImageValidationSchema,
  MAX_CATEGORIES,
  preprocessBoolean,
  preprocessDate,
  preprocessInt
} from "./common";
import {
  type CompanyCreate,
  type CompanyUpdate,
  type ExistingCompany
} from "./companies";
import zod from "zod";

export const ExistingCompanyValidationSchema = zod.object({
  _id: IdValidationSchema,
  categories: zod.array(IdValidationSchema).nonempty().max(MAX_CATEGORIES),
  country: zod.string().length(COUNTRY_CODE_SIZE),
  createdAt: preprocessDate(zod.date()),
  description: zod.string().min(1).nullable().optional(),
  foundedAt: preprocessDate(zod.date()).nullable().optional(),
  founders: zod.array(FounderValidationSchema),
  foundingAgreement: zod.string().min(1).nullable().optional(),
  images: zod.array(ImageValidationSchema),
  logo: ImageValidationSchema.nullable().optional(),
  name: zod.string().min(1).nullable().optional(),
  privateCompany: preprocessBoolean(zod.boolean()).nullable().optional(),
  recommended: preprocessBoolean(zod.boolean()).nullable().optional(),
  status: zod.enum([CompanyStatus.draft, CompanyStatus.founded]),
  targetValue: preprocessInt(zod.number().int().positive())
    .nullable()
    .optional(),
  website: zod.string().url().nullable().optional()
});

export const CompanyCreateValidationSchema =
  ExistingCompanyValidationSchema.pick({
    categories: true,
    country: true
  });

export const CompanyUpdateValidationSchema =
  ExistingCompanyValidationSchema.pick({
    categories: true,
    description: true,
    founders: true,
    logo: true,
    name: true,
    privateCompany: true,
    targetValue: true,
    website: true
  })
    .partial()
    .extend({
      addImages: zod.array(ImageValidationSchema).optional(),
      removeImages: zod.array(zod.string().min(1)).optional()
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
