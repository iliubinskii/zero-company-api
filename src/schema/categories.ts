import { Update } from "./common";

export interface Category {
  readonly description: string;
  readonly name: string;
  readonly pinned?: boolean;
  readonly tagline: string;
}

export interface CategoryCreate extends Category {}

export interface CategoryUpdate extends Update<Category> {}

export interface ExistingCategory extends Category {
  readonly _id: string;
}
