import { CompaniesService, Company } from "../schema";
import mongoose from "mongoose";

/**
 * Creates a MongoDB service for companies.
 * @returns A MongoDB service for companies.
 */
export function createCompaniesService(): CompaniesService {
  return {
    addCompany: async company => {
      const model = new Model(company);

      await model.save();
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

const Schema = new mongoose.Schema<Company>({
  name: { required: true, type: String }
});

const Model = mongoose.model("Company", Schema);
