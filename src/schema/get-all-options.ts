import type { CompanyStatus } from "./common";

export interface GetArticlesOptions {
  readonly limit?: number | undefined;
  readonly offset?: number | undefined;
  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: Add field to select articles or blogs
}

export interface GetCategoriesOptions {
  readonly limit?: number | undefined;
  readonly offset?: number | undefined;
  readonly onlyPinned?: boolean | undefined;
}

export interface GetCompaniesOptions {
  readonly cursor?: readonly [string, string] | undefined;
  readonly includePrivateCompanies?: boolean | undefined;
  readonly limit?: number | undefined;
  readonly offset?: number | undefined;
  readonly onlyRecommended?: boolean | undefined;
  readonly sortBy?: "createdAt" | "foundedAt" | "name" | undefined;
  readonly sortOrder?: "asc" | "desc" | undefined;
  readonly status?: CompanyStatus | undefined;
}

export interface GetDocumentsOptions {
  readonly limit?: number | undefined;
  readonly offset?: number | undefined;
  readonly sortBy?: "createdAt" | undefined;
  readonly sortOrder?: "asc" | "desc" | undefined;
}

export interface GetUsersOptions {
  readonly limit?: number | undefined;
  readonly offset?: number | undefined;
}
