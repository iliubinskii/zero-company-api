import {
  COMPANY_STATUS,
  IdValidationSchema,
  preprocessBoolean,
  preprocessNumber
} from "./common";
import type {
  GetCategoriesOptions,
  GetCompaniesOptions,
  GetDocumentsOptions,
  GetUsersOptions
} from "./get-all-options";
import { MAX_LIMIT } from "./consts";
import type { ValidationResult } from "./common";
import zod from "zod";

const cursor = zod.tuple([zod.string().min(1), IdValidationSchema]).optional();

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

const status = zod.enum([
  COMPANY_STATUS.draft,
  COMPANY_STATUS.founded,
  COMPANY_STATUS.signing
]);

export const GetCategoriesOptionsValidationSchema = zod.strictObject({
  limit,
  offset,
  onlyPinned
});

export const GetCompaniesOptionsValidationSchema = zod.strictObject({
  cursor,
  includePrivateCompanies,
  limit,
  offset,
  onlyRecommended,
  sortBy: sortBy.companies,
  sortOrder: sortOrder.companies,
  status
});

export const GetDocumentsOptionsValidationSchema = zod.strictObject({
  limit,
  offset
});

export const GetUsersOptionsValidationSchema = zod.strictObject({
  limit,
  offset
});

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

// Type check the get documents options validation schema
((): ValidationResult<GetDocumentsOptions> | undefined => {
  const result = GetDocumentsOptionsValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the get users options validation schema
((): ValidationResult<GetUsersOptions> | undefined => {
  const result = GetUsersOptionsValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();
