import { CompaniesService } from "../types";
import { Company } from "../schema";
import { CompanyModel } from "./model";
import { FilterQuery } from "mongoose";
import { MONGODB_MAX_LIMIT } from "../consts";
import { Writable } from "ts-toolbelt/out/Object/Writable";

/**
 * Creates a MongoDB service for companies.
 * @returns A MongoDB service for companies.
 */
export function createCompaniesService(): CompaniesService {
  return {
    addCompany: async company => {
      const model = new CompanyModel(company);

      const addedCompany = await model.save();

      const { _id, ...rest } = addedCompany.toObject();

      return { id: _id.toString(), ...rest };
    },
    deleteCompany: async id => {
      const deletedCompany = await CompanyModel.findByIdAndDelete(id);

      return deletedCompany ? 1 : 0;
    },
    getCompanies: async ({
      category,
      limit = MONGODB_MAX_LIMIT.companies,
      offset = 0
    } = {}) => {
      const filter: Writable<FilterQuery<Company>, "categories"> = {};

      if (typeof category === "string") filter.categories = { $in: [category] };

      const [companies, total] = await Promise.all([
        CompanyModel.find(filter).skip(offset).limit(limit),
        CompanyModel.countDocuments(filter)
      ]);

      return {
        docs: companies.map(company => {
          const { _id, ...rest } = company.toObject();

          return { id: _id.toString(), ...rest };
        }),
        total
      };
    },
    getCompany: async id => {
      const company = await CompanyModel.findById(id);

      if (company) {
        const { _id, ...rest } = company.toObject();

        return { id: _id.toString(), ...rest };
      }

      return undefined;
    },
    updateCompany: async (id, company) => {
      const updatedCompany = await CompanyModel.findByIdAndUpdate(
        id,
        { $set: company },
        { new: true }
      );

      if (updatedCompany) {
        const { _id, ...rest } = updatedCompany.toObject();

        return { id: _id.toString(), ...rest };
      }

      return undefined;
    }
  };
}
