import { CategoriesService, Category } from "../schema";
import mongoose from "mongoose";

/**
 * Creates a MongoDB service for categories.
 * @returns A MongoDB service for categories.
 */
export function createCategoriesService(): CategoriesService {
  return {
    addCategory: async category => {
      const model = new Model(category);

      const addedCategory = await model.save();

      return addedCategory;
    },
    deleteCategory: async id => {
      const result = await Model.findByIdAndDelete(id);

      return result ? 1 : 0;
    },
    getCategories: async () => {
      const categories = await Model.find({});

      return categories;
    },
    getCategory: async id => {
      const category = await Model.findById(id);

      return category ?? undefined;
    },
    updateCategory: async (id, category) => {
      const mongodbCategory = new Model(category);

      const result = await Model.findByIdAndUpdate(id, mongodbCategory);

      return result ?? undefined;
    }
  };
}

const Schema = new mongoose.Schema<Category>({
  description: { required: true, type: String },
  name: { required: true, type: String },
  tagline: { required: true, type: String }
});

const Model = mongoose.model("Category", Schema);
