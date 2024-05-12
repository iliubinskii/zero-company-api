import { Category, MAX_LIMIT } from "../../schema";
import { CategoriesService } from "../../types";
import { FilterQuery } from "mongoose";
import { Writable } from "ts-toolbelt/out/Object/Writable";
import { buildMongodbQuery } from "../../utils";
import { getCategoryModel } from "./model";

/**
 * Creates a MongoDB service for categories.
 * @returns A MongoDB service for categories.
 */
export function createCategoriesService(): CategoriesService {
  return {
    addCategory: async category => {
      const CategoryModel = await getCategoryModel();

      const model = new CategoryModel(category);

      const addedCategory = await model.save();

      const { _id, ...rest } = addedCategory.toObject();

      return { _id: _id.toString(), ...rest };
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
        docs: categories.map(category => {
          const { _id, ...rest } = category.toObject();

          return { _id: _id.toString(), ...rest };
        }),
        total
      };
    },
    getCategory: async id => {
      const CategoryModel = await getCategoryModel();

      const category = await CategoryModel.findById(id);

      if (category) {
        const { _id, ...rest } = category.toObject();

        return { _id: _id.toString(), ...rest };
      }

      return undefined;
    },
    updateCategory: async (id, category) => {
      const CategoryModel = await getCategoryModel();

      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        id,
        buildMongodbQuery(category),
        { new: true }
      );

      if (updatedCategory) {
        const { _id, ...rest } = updatedCategory.toObject();

        return { _id: _id.toString(), ...rest };
      }

      return undefined;
    }
  };
}
