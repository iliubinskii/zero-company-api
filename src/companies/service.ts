import { CompaniesService } from "../types";
import { Company } from "../schema";
import mongoose, { InferSchemaType } from "mongoose";

/**
 * Creates a MongoDB service for companies.
 * @returns A MongoDB service for companies.
 */
export function createCompaniesService(): CompaniesService {
  return {
    addCompany: async company => {
      const model = new Model(company);

      const addedCompany = await model.save();

      return addedCompany;
    },
    deleteCompany: async id => {
      const result = await Model.findByIdAndDelete(id);

      return result ? 1 : 0;
    },
    getCompanies: async () => {
      const companies = await Model.find({});

      return companies;
    },
    getCompany: async id => {
      const company = await Model.findById(id);

      return company ?? undefined;
    },
    updateCompany: async (id, company) => {
      const mongodbCompany = new Model(company);

      const result = await Model.findByIdAndUpdate(id, mongodbCompany);

      return result ?? undefined;
    }
  };
}

const Schema = new mongoose.Schema({
  categories: { required: true, type: [String] },
  header: { required: true, type: String },
  images: { required: true, type: [String] },
  logo: { required: true, type: String },
  name: { required: true, type: String }
});

const Model = mongoose.model("Company", Schema);

/**
 * Type check
 * @param value - Value
 * @returns Value
 */
export function typeCheck(value: InferSchemaType<typeof Schema>): Company {
  return value;
}
