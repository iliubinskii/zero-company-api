export interface GetCategoriesOptions {
  readonly limit?: number;
  readonly offset?: number;
}

export interface GetCompaniesOptions {
  readonly category?: string;
  readonly cursor?: readonly [string, string];
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
