/// <reference types="jest-extended" />

import { Category, Company, User } from "./schema";
import {
  GetCategoriesOptions,
  GetCompaniesByCategoryOptions,
  GetCompaniesByUserOptions,
  GetCompaniesOptions,
  GetUsersOptions
} from "./types";

declare module "express-serve-static-core" {
  interface Request {
    category?: Category;
    categoryUpdate?: Partial<Category>;
    company?: Company;
    companyUpdate?: Partial<Company>;
    getCategoriesOptions?: GetCategoriesOptions;
    getCompaniesByCategoryOptions?: GetCompaniesByCategoryOptions;
    getCompaniesByUserOptions?: GetCompaniesByUserOptions;
    getCompaniesOptions?: GetCompaniesOptions;
    getUsersOptions?: GetUsersOptions;
    user?: User;
    userUpdate?: Partial<User>;
  }
}
