import { Company, ExistingCompany, MultipleDocsResponse } from "../../schema";
import { buildMongodbQuery, filterUndefinedProperties } from "../../utils";
import { CompaniesService } from "../../types";
import { FilterQuery } from "mongoose";
import { MONGODB_MAX_LIMIT } from "../../consts";
import { Writable } from "ts-toolbelt/out/Object/Writable";
import { getCompanyModel } from "./model";

/**
 * Creates a MongoDB service for companies.
 * @returns A MongoDB service for companies.
 */
export function createCompaniesService(): CompaniesService {
  return {
    addCompany: async (company): Promise<ExistingCompany> => {
      const CompanyModel = await getCompanyModel();

      const model = new CompanyModel<Company>({
        ...company,
        foundedAt: new Date().toISOString()
      });

      const addedCompany = await model.save();

      const { _id, ...rest } = addedCompany.toObject();

      return { _id: _id.toString(), ...rest };
    },
    deleteCompany: async (id): Promise<number> => {
      const CompanyModel = await getCompanyModel();

      const deletedCompany = await CompanyModel.findByIdAndDelete(id);

      return deletedCompany ? 1 : 0;
    },
    getCompanies: async ({
      category,
      cursor,
      founderEmail,
      includePrivateCompanies = false,
      limit = MONGODB_MAX_LIMIT.companies,
      offset = 0,
      onlyRecommended = false,
      sortBy = "name",
      sortOrder = "asc"
    } = {}): Promise<MultipleDocsResponse<ExistingCompany>> => {
      const filter: Writable<FilterQuery<Company>> = {};

      if (typeof category === "string")
        filter["categories"] = { $in: category };

      if (typeof founderEmail === "string")
        filter["founders.email"] = { $in: founderEmail };

      if (onlyRecommended) filter["recommended"] = true;

      if (includePrivateCompanies) {
        // Include both public and private companies
      } else filter["privateCompany"] = { $ne: true };

      if (cursor) {
        const [sortByValue, id] = cursor;

        filter["$or"] = [
          { [sortBy]: { $gt: sortByValue } },
          { _id: { $gt: id }, [sortBy]: sortByValue }
        ];
      }

      const sortOrderNum = sortOrder === "asc" ? 1 : -1;

      const CompanyModel = await getCompanyModel();

      const [companies, total] = await Promise.all([
        CompanyModel.find(filter)
          .skip(offset)
          .limit(limit)
          .sort(
            Object.fromEntries([
              [sortBy, sortOrderNum],
              ["_id", sortOrderNum]
            ])
          ),
        CompanyModel.countDocuments(filter)
      ]);

      const lastCompany = companies.at(-1);

      return filterUndefinedProperties({
        count: companies.length,
        docs: companies.map(company => {
          const { _id, ...rest } = company.toObject();

          return { _id: _id.toString(), ...rest };
        }),
        nextCursor:
          companies.length === limit && lastCompany
            ? [lastCompany[sortBy], lastCompany._id.toString()]
            : undefined,
        total
      });
    },
    getCompany: async (id): Promise<ExistingCompany | undefined> => {
      const CompanyModel = await getCompanyModel();

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
      const CompanyModel = await getCompanyModel();

      const updatedCompany = await CompanyModel.findByIdAndUpdate(
        id,
        buildMongodbQuery(company),
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
