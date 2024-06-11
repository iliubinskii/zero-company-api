import type { CategoriesService } from "../../types";
import type { Category } from "../../schema";
import type { FilterQuery } from "mongoose";
import { MAX_LIMIT } from "../../schema";
import type { Writable } from "ts-toolbelt/out/Object/Writable";
import { getCategoryModel } from "../../schema-mongodb";

/**
 * Creates a MongoDB service for categories.
 * @returns A MongoDB service for categories.
 */
export function createCategoriesService(): CategoriesService {
  return {
    addCategory: async category => {
      const CategoryModel = await getCategoryModel();

      const model = new CategoryModel(category);

      const addedItem = await model.save();

      return addedItem;
    },
    deleteCategory: async id => {
      const CategoryModel = await getCategoryModel();

      const deletedCategory = await CategoryModel.findByIdAndDelete(id);

      return deletedCategory ? 1 : 0;
    },
    getCategories: async ({
      limit = MAX_LIMIT,
      offset = 0,
      onlyPinned = false
    } = {}) => {
      const filter: Writable<FilterQuery<Category>> = {};

      if (onlyPinned) filter["pinned"] = true;

      const CategoryModel = await getCategoryModel();

      const [categories, total] = await Promise.all([
        CategoryModel.find(filter).skip(offset).limit(limit),
        CategoryModel.countDocuments(filter)
      ]);

      return {
        count: categories.length,
        docs: categories,
        total
      };
    },
    getCategory: async id => {
      const CompanyModel = await getCategoryModel();

      const category = await CompanyModel.findById(id);

      return category;
    },
    updateCategory: async (id, category) => {
      const CategoryModel = await getCategoryModel();

      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        id,
        category,
        { new: true, runValidators: true }
      );

      return updatedCategory;
    }
  };
}
