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

      const { _id, ...rest } = addedCompany.toObject();

      return { id: _id.toString(), ...rest };
    },
    deleteCompany: async id => {
      const deletedCompany = await Model.findByIdAndDelete(id);

      return deletedCompany ? 1 : 0;
    },
    getCompanies: async () => {
      const companies = await Model.find({});

      return companies.map(company => {
        const { _id, ...rest } = company.toObject();

        return { id: _id.toString(), ...rest };
      });
    },
    getCompany: async id => {
      const company = await Model.findById(id);

      if (company) {
        const { _id, ...rest } = company.toObject();

        return { id: _id.toString(), ...rest };
      }

      return undefined;
    },
    updateCompany: async (id, company) => {
      const model = new Model(company);

      const updatedCompany = await Model.findByIdAndUpdate(id, model);

      if (updatedCompany) {
        const { _id, ...rest } = updatedCompany.toObject();

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
export function typeCheck(value: InferSchemaType<typeof Schema>): Company {
  return value;
}

const Schema = new mongoose.Schema({
  categories: { required: true, type: [String] },
  header: { required: true, type: String },
  images: { required: true, type: [String] },
  logo: { required: true, type: String },
  name: { required: true, type: String }
});

const Model = mongoose.model("Company", Schema);
