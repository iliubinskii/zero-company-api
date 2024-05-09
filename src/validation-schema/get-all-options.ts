import {
  GetCategoriesOptions,
  GetCompaniesByCategoryOptions,
  GetCompaniesByUserOptions,
  GetCompaniesOptions,
  GetUsersOptions
} from "../schema";
import { preprocessBoolean, preprocessNumber } from "../utils";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import { MONGODB_MAX_LIMIT } from "../consts";
import zod from "zod";

export const GetCategoriesOptionsValidationSchema = zod.strictObject({
  limit: preprocessNumber(
    zod.number().int().positive().max(MONGODB_MAX_LIMIT.categories).optional()
  ),
  offset: preprocessNumber(zod.number().int().nonnegative().optional())
});

export const GetCompaniesOptionsValidationSchema = zod.strictObject({
  category: zod.string().min(1).optional(),
  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: Validate as [string, string] instead of string
  // Validation library - "zod"
  cursor: zod.string().min(1).optional(),
  founderEmail: zod.string().min(1).optional(),
  includePrivateCompanies: preprocessBoolean(zod.boolean().optional()),
  limit: preprocessNumber(
    zod.number().int().positive().max(MONGODB_MAX_LIMIT.companies).optional()
  ),
  offset: preprocessNumber(zod.number().int().nonnegative().optional()),
  onlyRecommended: preprocessBoolean(zod.boolean().optional()),
  sortBy: zod.union([zod.literal("foundedAt"), zod.literal("name")]).optional(),
  sortOrder: zod.union([zod.literal("asc"), zod.literal("desc")]).optional()
});

export const GetCompaniesByCategoryOptionsValidationSchema =
  GetCompaniesOptionsValidationSchema.omit({
    category: true
  });

export const GetCompaniesByUserOptionsValidationSchema =
  GetCompaniesOptionsValidationSchema.omit({
    founderEmail: true
  });

export const GetUsersOptionsValidationSchema = zod.strictObject({
  limit: preprocessNumber(
    zod.number().int().positive().max(MONGODB_MAX_LIMIT.users).optional()
  ),
  offset: preprocessNumber(zod.number().int().nonnegative().optional())
});

// Type check the get companies options validation schema
((): Equals<
  keyof zod.infer<typeof GetCategoriesOptionsValidationSchema>,
  keyof GetCategoriesOptions
> => 1)();

// Type check the get companies options validation schema
((): Equals<
  keyof zod.infer<typeof GetCompaniesOptionsValidationSchema>,
  keyof GetCompaniesOptions
> => 1)();

// Type check the get companies by category options validation schema
((): Equals<
  keyof zod.infer<typeof GetCompaniesByCategoryOptionsValidationSchema>,
  keyof GetCompaniesByCategoryOptions
> => 1)();

// Type check the get companies by user options validation schema
((): Equals<
  keyof zod.infer<typeof GetCompaniesByUserOptionsValidationSchema>,
  keyof GetCompaniesByUserOptions
> => 1)();

// Type check the get companies options validation schema
((): Equals<
  keyof zod.infer<typeof GetUsersOptionsValidationSchema>,
  keyof GetUsersOptions
> => 1)();
