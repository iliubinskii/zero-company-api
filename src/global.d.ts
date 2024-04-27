/// <reference types="jest-extended" />

import { Category, Company } from "./schema";
import {
  GetCategoriesOptions,
  GetCompaniesByCategoryOptions,
  GetCompaniesOptions
} from "./types";

declare module "express-serve-static-core" {
  interface Request {
    category?: Category;
    categoryUpdate?: Partial<Category>;
    company?: Company;
    companyUpdate?: Partial<Company>;
    getCategoriesOptions?: GetCategoriesOptions;
    getCompaniesByCategoryOptions?: GetCompaniesByCategoryOptions;
    getCompaniesOptions?: GetCompaniesOptions;
  }
}
