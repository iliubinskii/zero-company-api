export interface Category {
  readonly description: string;
  readonly name: string;
  readonly tagline: string;
}

export type Categories = readonly Category[];

export interface ExistingCategory extends Category {
  readonly id: string;
}

export type ExistingCategories = readonly ExistingCategory[];

export interface GetCategoriesResponse {
  readonly docs: ExistingCategories;
  readonly total: number;
}
