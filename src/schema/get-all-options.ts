export interface GetCategoriesOptions {
  readonly limit?: number;
  readonly offset?: number;
}

export interface GetCompaniesOptions {
  readonly category?: string;
  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: [string, string]
  readonly cursor?: string;
  readonly founderEmail?: string;
  readonly includePrivateCompanies?: boolean;
  readonly limit?: number;
  readonly offset?: number;
  readonly onlyRecommended?: boolean;
  readonly sortBy?: "foundedAt" | "name";
  readonly sortOrder?: "asc" | "desc";
}

export interface GetCompaniesByCategoryOptions
  extends Omit<GetCompaniesOptions, "category"> {}

export interface GetCompaniesByUserOptions
  extends Omit<GetCompaniesOptions, "founderEmail"> {}

export interface GetUsersOptions {
  readonly limit?: number;
  readonly offset?: number;
}
