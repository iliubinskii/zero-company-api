/* eslint-disable spaced-comment -- Ok */

/// <reference types="jest-extended" />

import { Category, Company } from "./schema";

declare module "express-serve-static-core" {
  interface Request {
    customCategory?: Category;
    customCategoryUpdate?: Partial<Category>;
    customCompany?: Company;
    customCompanyUpdate?: Partial<Company>;
  }
}
