/// <reference types="jest-extended" />

import { Category, Company } from "./schema";
import {
  GetCategoriesOptions,
  GetCompaniesByCategoryOptions,
  GetCompaniesOptions
} from "./types";

declare module "express-serve-static-core" {
  interface Request {
    customCategory?: Category;
    customCategoryUpdate?: Partial<Category>;
    customCompany?: Company;
    customCompanyUpdate?: Partial<Company>;
    getCategoriesOptions?: GetCategoriesOptions;
    getCompaniesByCategoryOptions?: GetCompaniesByCategoryOptions;
    getCompaniesOptions?: GetCompaniesOptions;
  }
}
