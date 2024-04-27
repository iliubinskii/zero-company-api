import { CompaniesService } from "../types";
import { CompanyModel } from "./model";

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
    getCompanies: async () => {
      const companies = await CompanyModel.find({});

      return companies.map(company => {
        const { _id, ...rest } = company.toObject();

        return { id: _id.toString(), ...rest };
      });
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
      const model = new CompanyModel(company);

      const updatedCompany = await CompanyModel.findByIdAndUpdate(id, model);

      if (updatedCompany) {
        const { _id, ...rest } = updatedCompany.toObject();

        return { id: _id.toString(), ...rest };
      }

      return undefined;
    }
  };
}
