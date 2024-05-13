import {
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
import { Equals } from "ts-toolbelt/out/Any/Equals";
import { MAX_LIMIT } from "./consts";
import _ from "lodash";
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

export const GetCompaniesByCategoryOptionsValidationSchema = zod.strictObject(
  _.omit(fields.companies, ["category"])
);

export const GetCompaniesByUserOptionsValidationSchema = zod.strictObject(
  _.omit(fields.companies, ["founderEmail"])
);

export const GetUsersOptionsValidationSchema = zod.strictObject(fields.users);

// Type check the get categories options validation schema
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
