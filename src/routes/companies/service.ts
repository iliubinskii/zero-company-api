import { Company, ExistingCompany, GetCompaniesResponse } from "../../schema";
import { CompaniesService } from "../../types";
import { CompanyModel } from "./model";
import { FilterQuery } from "mongoose";
import { MONGODB_MAX_LIMIT } from "../../consts";
import { Writable } from "ts-toolbelt/out/Object/Writable";

/**
 * Creates a MongoDB service for companies.
 * @returns A MongoDB service for companies.
 */
export function createCompaniesService(): CompaniesService {
  return {
    addCompany: async (company): Promise<ExistingCompany> => {
      const model = new CompanyModel<Company>({
        ...company,
        foundedAt: new Date().toISOString(),
        recommended: false
      });

      const addedCompany = await model.save();

      const { _id, ...rest } = addedCompany.toObject();

      return { _id: _id.toString(), ...rest };
    },
    deleteCompany: async (id): Promise<number> => {
      const deletedCompany = await CompanyModel.findByIdAndDelete(id);

      return deletedCompany ? 1 : 0;
    },
    getCompanies: async ({
      category,
      founderEmail,
      limit = MONGODB_MAX_LIMIT.companies,
      offset = 0
    } = {}): Promise<GetCompaniesResponse> => {
      const filter: Writable<
        FilterQuery<Company>,
        "categories" | "founders"
      > = {};

      if (typeof category === "string") filter.categories = { $in: category };

      if (typeof founderEmail === "string")
        filter["founders.email"] = { $in: founderEmail };

      const [companies, total] = await Promise.all([
        CompanyModel.find(filter).skip(offset).limit(limit),
        CompanyModel.countDocuments(filter)
      ]);

      return {
        docs: companies.map(company => {
          const { _id, ...rest } = company.toObject();

          return { _id: _id.toString(), ...rest };
        }),
        total
      };
    },
    getCompany: async (id): Promise<ExistingCompany | undefined> => {
      const company = await CompanyModel.findById(id);

      if (company) {
        const { _id, ...rest } = company.toObject();

        return { _id: _id.toString(), ...rest };
      }

      return undefined;
    },
    updateCompany: async (
      id,
      company
    ): Promise<ExistingCompany | undefined> => {
      const updatedCompany = await CompanyModel.findByIdAndUpdate(
        id,
        { $set: company },
        { new: true }
      );

      if (updatedCompany) {
        const { _id, ...rest } = updatedCompany.toObject();

        return { _id: _id.toString(), ...rest };
      }

      return undefined;
    }
  };
}
