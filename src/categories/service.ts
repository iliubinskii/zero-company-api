import { CategoriesService } from "../types";
import { CategoryModel } from "./model";
import { Company } from "../schema";
import mongoose from "mongoose";

/**
 * Creates a MongoDB service for categories.
 * @param CompanyModel - A MongoDB model for companies.
 * @returns A MongoDB service for categories.
 */
export function createCategoriesService(
  CompanyModel: mongoose.Model<Company>
): CategoriesService {
  return {
    addCategory: async category => {
      const model = new CategoryModel(category);

      const addedCategory = await model.save();

      const { _id, ...rest } = addedCategory.toObject();

      return { id: _id.toString(), ...rest };
    },
    deleteCategory: async id => {
      const deletedCategory = await CategoryModel.findByIdAndDelete(id);

      return deletedCategory ? 1 : 0;
    },
    getCategories: async () => {
      const categories = await CategoryModel.find({});

      return categories.map(category => {
        const { _id, ...rest } = category.toObject();

        return { id: _id.toString(), ...rest };
      });
    },
    getCategory: async id => {
      const category = await CategoryModel.findById(id);

      if (category) {
        const { _id, ...rest } = category.toObject();

        return { id: _id.toString(), ...rest };
      }

      return undefined;
    },
    getCompaniesByCategory: async id => {
      const companies = await CompanyModel.find({ categories: { $in: id } });

      return companies.map(company => {
        const { _id, ...rest } = company.toObject();

        return { id: _id.toString(), ...rest };
      });
    },
    updateCategory: async (id, category) => {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        id,
        { $set: category },
        { new: true }
      );

      if (updatedCategory) {
        const { _id, ...rest } = updatedCategory.toObject();

        return { id: _id.toString(), ...rest };
      }

      return undefined;
    }
  };
}
