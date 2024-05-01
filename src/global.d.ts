/// <reference types="jest-extended" />

import {
  CategoryCreate,
  CategoryUpdate,
  CompanyCreate,
  CompanyUpdate,
  JwtUser,
  UserCreate,
  UserUpdate
} from "./schema";
import {
  GetCategoriesOptions,
  GetCompaniesByCategoryOptions,
  GetCompaniesByUserOptions,
  GetCompaniesOptions,
  GetUsersOptions
} from "./types";

declare module "express-serve-static-core" {
  interface Request {
    categoryCreate?: CategoryCreate;
    categoryUpdate?: CategoryUpdate;
    companyCreate?: CompanyCreate;
    companyUpdate?: CompanyUpdate;
    getCategoriesOptions?: GetCategoriesOptions;
    getCompaniesByCategoryOptions?: GetCompaniesByCategoryOptions;
    getCompaniesByUserOptions?: GetCompaniesByUserOptions;
    getCompaniesOptions?: GetCompaniesOptions;
    getUsersOptions?: GetUsersOptions;
    jwtUser?: JwtUser;
    readonly logout: () => void;
    userCreate?: UserCreate;
    userEmail?: string;
    userUpdate?: UserUpdate;
  }
}
