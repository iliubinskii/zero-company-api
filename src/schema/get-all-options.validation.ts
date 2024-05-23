import type {
  GetCategoriesOptions,
  GetCompaniesByCategoryOptions,
  GetCompaniesByUserOptions,
  GetCompaniesOptions,
  GetUsersOptions
} from "./get-all-options";
import {
  IdValidationSchema,
  preprocessBoolean,
  preprocessNumber
} from "./common";
import { MAX_LIMIT } from "./consts";
import type { ValidationResult } from "./common";
import zod from "zod";

const category = IdValidationSchema.optional();

const cursor = zod.tuple([zod.string().min(1), IdValidationSchema]).optional();

const founderEmail = zod.string().min(1).optional();

const includePrivateCompanies = preprocessBoolean(zod.boolean()).optional();

const limit = preprocessNumber(
  zod.number().int().positive().max(MAX_LIMIT)
).optional();

const offset = preprocessNumber(zod.number().int().nonnegative()).optional();

const onlyPinned = preprocessBoolean(zod.boolean()).optional();

const onlyRecommended = preprocessBoolean(zod.boolean()).optional();

const sortBy = {
  companies: zod
    .union([zod.literal("foundedAt"), zod.literal("name")])
    .optional()
} as const;

const sortOrder = {
  companies: zod.union([zod.literal("asc"), zod.literal("desc")]).optional()
} as const;

const fields = {
  categories: { limit, offset, onlyPinned },
  companies: {
    category,
    cursor,
    founderEmail,
    includePrivateCompanies,
    limit,
    offset,
    onlyRecommended,
    sortBy: sortBy.companies,
    sortOrder: sortOrder.companies
  },
  users: { limit, offset }
} as const;

export const GetCategoriesOptionsValidationSchema = zod.strictObject(
  fields.categories
);

export const GetCompaniesOptionsValidationSchema = zod.strictObject(
  fields.companies
);

export const GetCompaniesByCategoryOptionsValidationSchema =
  GetCompaniesOptionsValidationSchema.omit({ category: true });

export const GetCompaniesByUserOptionsValidationSchema =
  GetCompaniesOptionsValidationSchema.omit({ founderEmail: true });

export const GetUsersOptionsValidationSchema = zod.strictObject(fields.users);

// Type check the get categories options validation schema
((): ValidationResult<GetCategoriesOptions> | undefined => {
  const result = GetCategoriesOptionsValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the get companies options validation schema
((): ValidationResult<GetCompaniesOptions> | undefined => {
  const result = GetCompaniesOptionsValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the get companies by category options validation schema
((): ValidationResult<GetCompaniesByCategoryOptions> | undefined => {
  const result =
    GetCompaniesByCategoryOptionsValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the get companies by user options validation schema
((): ValidationResult<GetCompaniesByUserOptions> | undefined => {
  const result = GetCompaniesByUserOptionsValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the get users options validation schema
((): ValidationResult<GetUsersOptions> | undefined => {
  const result = GetUsersOptionsValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();
