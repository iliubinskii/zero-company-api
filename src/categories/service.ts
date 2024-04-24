import { CategoriesService } from "../types";
import { Category } from "../schema";
import mongoose, { InferSchemaType } from "mongoose";

/**
 * Creates a MongoDB service for categories.
 * @returns A MongoDB service for categories.
 */
export function createCategoriesService(): CategoriesService {
  return {
    addCategory: async category => {
      const model = new Model(category);

      const addedCategory = await model.save();

      const { _id, ...rest } = addedCategory.toObject();

      return { id: _id.toString(), ...rest };
    },
    deleteCategory: async id => {
      const deletedCategory = await Model.findByIdAndDelete(id);

      return deletedCategory ? 1 : 0;
    },
    getCategories: async () => {
      const categories = await Model.find({});

      return categories.map(category => {
        const { _id, ...rest } = category.toObject();

        return { id: _id.toString(), ...rest };
      });
    },
    getCategory: async id => {
      const category = await Model.findById(id);

      if (category) {
        const { _id, ...rest } = category.toObject();

        return { id: _id.toString(), ...rest };
      }

      return undefined;
    },
    updateCategory: async (id, category) => {
      const model = new Model(category);

      const updatedCategory = await Model.findByIdAndUpdate(id, model);

      if (updatedCategory) {
        const { _id, ...rest } = updatedCategory.toObject();

        return { id: _id.toString(), ...rest };
      }

      return undefined;
    }
  };
}

/**
 * Type check
 * @param value - Value
 * @returns Value
 */
export function typeCheck(value: InferSchemaType<typeof Schema>): Category {
  return value;
}

const Schema = new mongoose.Schema({
  description: { required: true, type: String },
  name: { required: true, type: String },
  tagline: { required: true, type: String }
});

const Model = mongoose.model("Category", Schema);
