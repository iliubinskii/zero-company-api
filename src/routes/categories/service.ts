import { ExistingCategory, MultipleDocsResponse } from "../../schema";
import { CategoriesService } from "../../types";
import { CategoryModel } from "./model";
import { MONGODB_MAX_LIMIT } from "../../consts";

/**
 * Creates a MongoDB service for categories.
 * @returns A MongoDB service for categories.
 */
export function createCategoriesService(): CategoriesService {
  return {
    addCategory: async (category): Promise<ExistingCategory> => {
      const model = new CategoryModel(category);

      const addedCategory = await model.save();

      const { _id, ...rest } = addedCategory.toObject();

      return { _id: _id.toString(), ...rest };
    },
    deleteCategory: async (id): Promise<number> => {
      const deletedCategory = await CategoryModel.findByIdAndDelete(id);

      return deletedCategory ? 1 : 0;
    },
    getCategories: async ({
      limit = MONGODB_MAX_LIMIT.categories,
      offset = 0
    } = {}): Promise<MultipleDocsResponse<ExistingCategory>> => {
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
    getCategory: async (id): Promise<ExistingCategory | undefined> => {
      const category = await CategoryModel.findById(id);

      if (category) {
        const { _id, ...rest } = category.toObject();

        return { _id: _id.toString(), ...rest };
      }

      return undefined;
    },
    updateCategory: async (
      id,
      category
    ): Promise<ExistingCategory | undefined> => {
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
