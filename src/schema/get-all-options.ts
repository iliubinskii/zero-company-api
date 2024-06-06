import type { CompanyStatus } from "./common";

export interface GetCategoriesOptions {
  readonly limit?: number;
  readonly offset?: number;
  readonly onlyPinned?: boolean;
}

export interface GetCompaniesOptions {
  readonly cursor?: readonly [string, string];
  readonly includePrivateCompanies?: boolean;
  readonly limit?: number;
  readonly offset?: number;
  readonly onlyRecommended?: boolean;
  readonly sortBy?: "createdAt" | "foundedAt" | "name";
  readonly sortOrder?: "asc" | "desc";
  readonly status?: CompanyStatus;
}

export interface GetDocumentsOptions {
  readonly limit?: number;
  readonly offset?: number;
}

export interface GetUsersOptions {
  readonly limit?: number;
  readonly offset?: number;
}
