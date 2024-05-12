/// <reference types="jest-extended" />

import {
  CategoryCreate,
  CategoryUpdate,
  CompanyCreate,
  CompanyUpdate,
  GetCategoriesOptions,
  GetCompaniesByCategoryOptions,
  GetCompaniesByUserOptions,
  GetCompaniesOptions,
  GetUsersOptions,
  JwtUser,
  UserCreate,
  UserUpdate
} from "./schema";

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
    idParam?: string;
    jwtUser?: JwtUser;
    readonly logout: () => void;
    requestId: string;
    userCreate?: UserCreate;
    userEmail?: string;
    userUpdate?: UserUpdate;
  }
}
