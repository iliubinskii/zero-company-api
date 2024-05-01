import { CategoriesService } from "../../types";
import { CategoryModel } from "./model";
import { MONGODB_MAX_LIMIT } from "../../consts";

/**
 * Creates a MongoDB service for categories.
 * @returns A MongoDB service for categories.
 */
export function createCategoriesService(): CategoriesService {
  return {
    addCategory: async category => {
      const model = new CategoryModel(category);

      const addedCategory = await model.save();

      const { _id, ...rest } = addedCategory.toObject();

      return { _id: _id.toString(), ...rest };
    },
    deleteCategory: async id => {
      const deletedCategory = await CategoryModel.findByIdAndDelete(id);

      return deletedCategory ? 1 : 0;
    },
    getCategories: async ({
      limit = MONGODB_MAX_LIMIT.categories,
      offset = 0
    } = {}) => {
      const [categories, total] = await Promise.all([
        CategoryModel.find().skip(offset).limit(limit),
        CategoryModel.countDocuments()
      ]);

      return {
        docs: categories.map(category => {
          const { _id, ...rest } = category.toObject();

          return { _id: _id.toString(), ...rest };
        }),
        total
      };
    },
    getCategory: async id => {
      const category = await CategoryModel.findById(id);

      if (category) {
        const { _id, ...rest } = category.toObject();

        return { _id: _id.toString(), ...rest };
      }

      return undefined;
    },
    updateCategory: async (id, category) => {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        id,
        { $set: category },
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
