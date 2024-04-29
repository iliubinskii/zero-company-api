import {
  CategoryCreate,
  CategoryUpdate,
  ExistingCategory,
  GetCategoriesResponse
} from "../schema";
import { RequestHandler } from "express";

export interface CategoryControllers {
  readonly addCategory: RequestHandler;
  readonly deleteCategory: RequestHandler;
  readonly getCategories: RequestHandler;
  readonly getCategory: RequestHandler;
  readonly getCompaniesByCategory: RequestHandler;
  readonly updateCategory: RequestHandler;
}

export interface CategoriesMiddleware {
  readonly requireValidCategory: RequestHandler;
  readonly requireValidCategoryUpdate: RequestHandler;
  readonly requireValidGetCategoriesOptions: RequestHandler;
  readonly requireValidGetCompaniesByCategoryOptions: RequestHandler;
}

export interface CategoriesService {
  /**
   * Adds a category to the database.
   * @param category - The category to add.
   * @returns A promise that resolves when the category has been added.
   */
  readonly addCategory: (category: CategoryCreate) => Promise<ExistingCategory>;
  /**
   * Deletes a category from the database.
   * @param id - The ID of the category to delete.
   * @returns A promise that resolves with the number of affected rows.
   */
  readonly deleteCategory: (id: string) => Promise<number>;
  /**
   * Gets all categories from the database.
   * @param options - The options to use when getting categories.
   * @returns A promise that resolves with all categories in the database.
   */
  readonly getCategories: (
    options?: GetCategoriesOptions
  ) => Promise<GetCategoriesResponse>;
  /**
   * Gets a category from the database.
   * @param id - The ID of the category to get.
   * @returns A promise that resolves with the category, or `undefined` if the category was not found.
   */
  readonly getCategory: (id: string) => Promise<ExistingCategory | undefined>;
  /**
   * Updates a category in the database.
   * @param id - The ID of the category to update.
   * @param category - The category data to update.
   * @returns A promise that resolves with the updated category, or `undefined` if the category was not found.
   */
  readonly updateCategory: (
    id: string,
    category: CategoryUpdate
  ) => Promise<ExistingCategory | undefined>;
}

export interface GetCategoriesOptions {
  readonly limit?: number;
  readonly offset?: number;
}

export interface GetCompaniesByCategoryOptions {
  readonly limit?: number;
  readonly offset?: number;
}
