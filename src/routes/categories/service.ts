import type { Category, CategoryUpdate } from "../../schema";
import type { CategoriesService } from "../../types";
import type { FilterQuery } from "mongoose";
import { MAX_LIMIT } from "../../schema";
import type { Writable } from "ts-toolbelt/out/Object/Writable";
import { createCrudService } from "../../services";
import { getCategoryModel } from "./model";
import { toObject } from "../../utils";

/**
 * Creates a MongoDB service for categories.
 * @returns A MongoDB service for categories.
 */
export function createCategoriesService(): CategoriesService {
  const crudService = createCrudService<Category, CategoryUpdate>(
    getCategoryModel
  );

  return {
    addCategory: crudService.addItemGuaranteed,
    crudService,
    deleteCategory: crudService.deleteItem,
    getCategories: async ({
      limit = MAX_LIMIT,
      offset = 0,
      onlyPinned = false
    } = {}) => {
      const filter: Writable<FilterQuery<Category>> = {};

      if (onlyPinned) filter["pinned"] = true;

      const CategoryModel = await getCategoryModel();

      // eslint-disable-next-line no-warning-comments -- Postponed
      // TODO: Use a single aggregate query to get both the count and the documents
      const [categories, total] = await Promise.all([
        CategoryModel.find(filter).skip(offset).limit(limit),
        CategoryModel.countDocuments(filter)
      ]);

      return {
        count: categories.length,
        docs: categories.map(toObject),
        total
      };
    },
    getCategory: crudService.getItem,
    updateCategory: crudService.updateItem
  };
}
