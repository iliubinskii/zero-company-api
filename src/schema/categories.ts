import type { MultipleDocsResponse, Update } from "./common";

export interface Category {
  readonly description: string;
  readonly name: string;
  readonly pinned?: boolean | undefined;
  readonly tagline: string;
}

export interface CategoryCreate extends Category {}

export interface CategoryUpdate extends Update<Category> {}

export interface ExistingCategory extends Category {
  readonly _id: string;
}

export type ExistingCategories = MultipleDocsResponse<ExistingCategory>;
