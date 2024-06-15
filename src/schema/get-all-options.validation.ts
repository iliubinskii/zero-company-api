import {
  CompanyStatus,
  CursorValidationSchema,
  LimitValidationSchema,
  OffsetValidationSchema,
  SortOrderValidationSchema,
  preprocessBoolean
} from "./common";
import type {
  GetCategoriesOptions,
  GetCompaniesOptions,
  GetDocumentsOptions,
  GetUsersOptions
} from "./get-all-options";
import zod from "zod";

export const GetCategoriesOptionsValidationSchema = zod.object({
  limit: LimitValidationSchema,
  offset: OffsetValidationSchema,
  onlyPinned: preprocessBoolean(zod.boolean()).optional()
});

export const GetCompaniesOptionsValidationSchema = zod.object({
  cursor: CursorValidationSchema,
  includePrivateCompanies: preprocessBoolean(zod.boolean()).optional(),
  limit: LimitValidationSchema,
  offset: OffsetValidationSchema,
  onlyRecommended: preprocessBoolean(zod.boolean()).optional(),
  sortBy: zod
    .union([
      zod.literal("createdAt"),
      zod.literal("foundedAt"),
      zod.literal("name")
    ])
    .optional(),
  sortOrder: SortOrderValidationSchema,
  status: zod.enum([CompanyStatus.draft, CompanyStatus.founded]).optional()
});

export const GetDocumentsOptionsValidationSchema = zod.object({
  limit: LimitValidationSchema,
  offset: OffsetValidationSchema,
  sortBy: zod.literal("createdAt").optional(),
  sortOrder: SortOrderValidationSchema
});

export const GetUsersOptionsValidationSchema = zod.object({
  limit: LimitValidationSchema,
  offset: OffsetValidationSchema
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
