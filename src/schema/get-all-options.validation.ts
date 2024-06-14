import {
  CompanyStatus,
  IdValidationSchema,
  preprocessBoolean,
  preprocessInt
} from "./common";
import type {
  GetCategoriesOptions,
  GetCompaniesOptions,
  GetDocumentsOptions,
  GetUsersOptions
} from "./get-all-options";
import { MAX_LIMIT } from "./consts";
import zod from "zod";

const cursor = zod.tuple([zod.string().min(1), IdValidationSchema]).optional();

const includePrivateCompanies = preprocessBoolean(zod.boolean()).optional();

const limit = preprocessInt(
  zod.number().int().positive().max(MAX_LIMIT)
).optional();

const offset = preprocessInt(zod.number().int().nonnegative()).optional();

const onlyPinned = preprocessBoolean(zod.boolean()).optional();

const onlyRecommended = preprocessBoolean(zod.boolean()).optional();

const sortBy = {
  companies: zod
    .union([
      zod.literal("createdAt"),
      zod.literal("foundedAt"),
      zod.literal("name")
    ])
    .optional(),
  documents: zod.literal("createdAt").optional()
} as const;

const sortOrder = zod
  .union([zod.literal("asc"), zod.literal("desc")])
  .optional();

const status = zod
  .enum([CompanyStatus.draft, CompanyStatus.founded])
  .optional();

export const GetCategoriesOptionsValidationSchema = zod.object({
  limit,
  offset,
  onlyPinned
});

export const GetCompaniesOptionsValidationSchema = zod.object({
  cursor,
  includePrivateCompanies,
  limit,
  offset,
  onlyRecommended,
  sortBy: sortBy.companies,
  sortOrder,
  status
});

export const GetDocumentsOptionsValidationSchema = zod.object({
  limit,
  offset,
  sortBy: sortBy.documents,
  sortOrder
});

export const GetUsersOptionsValidationSchema = zod.object({
  limit,
  offset
});

// Type check the get categories options validation schema
((): GetCategoriesOptions | undefined => {
  const result = GetCategoriesOptionsValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the get companies options validation schema
((): GetCompaniesOptions | undefined => {
  const result = GetCompaniesOptionsValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the get documents options validation schema
((): GetDocumentsOptions | undefined => {
  const result = GetDocumentsOptionsValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the get users options validation schema
((): GetUsersOptions | undefined => {
  const result = GetUsersOptionsValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();
