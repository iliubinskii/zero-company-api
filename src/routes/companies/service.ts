import type { Company, GetCompaniesOptions, User } from "../../schema";
import { getCompanyModel, getUserModel } from "../../schema-mongodb";
import type { CompaniesService } from "../../types";
import type { FilterQuery } from "mongoose";
import { MAX_LIMIT } from "../../schema";
import type { Writable } from "ts-toolbelt/out/Object/Writable";
import type mongoose from "mongoose";

/**
 * Creates a MongoDB service for companies.
 * @returns A MongoDB service for companies.
 */
export function createCompaniesService(): CompaniesService {
  return {
    addCompany: async company => {
      const CompanyModel = await getCompanyModel();

      const model = new CompanyModel(company);

      const addedItem = await model.save();

      return addedItem;
    },
    deleteCompany: async id => {
      const CompanyModel = await getCompanyModel();

      const deletedCategory = await CompanyModel.findByIdAndDelete(id);

      return deletedCategory ? 1 : 0;
    },
    getCompanies: async (options = {}, parentRef) => {
      const {
        limit = MAX_LIMIT,
        offset = 0,
        sortBy = "name",
        sortOrder = "asc"
      } = options;

      const filter: Writable<FilterQuery<Company>> = buildFilter(options);

      const mongodbSortOrderMap = { asc: 1, desc: -1 } as const;

      const mongodbSortOrder = mongodbSortOrderMap[sortOrder];

      const CompanyModel = await getCompanyModel();

      if (parentRef)
        switch (parentRef.type) {
          case "category": {
            filter["categories"] = { $in: parentRef.category };

            break;
          }

          case "founderEmail": {
            filter["founders.email"] = { $in: parentRef.founderEmail };

            break;
          }

          case "founderId": {
            const UserModel = await getUserModel();

            const user = await UserModel.findById(parentRef.founderId);

            if (user) filter["founders.email"] = user.email;
            else
              return {
                count: 0,
                docs: [],
                total: 0
              };
          }
        }

      const [companies, total] = await Promise.all([
        CompanyModel.find(filter)
          .skip(offset)
          .limit(limit)
          .sort(
            Object.fromEntries([
              [sortBy, mongodbSortOrder],
              ["_id", mongodbSortOrder]
            ])
          ),
        CompanyModel.countDocuments(filter)
      ]);

      const lastCompany = companies.at(-1);

      const nextCursor = ((): [string, string] | undefined => {
        if (companies.length === limit && lastCompany) {
          const cursor0 = lastCompany[sortBy];

          const cursor1 = lastCompany._id.toString();

          if (cursor0) return [cursor0.toString(), cursor1];
        }

        return undefined;
      })();

      return {
        count: companies.length,
        docs: companies,
        nextCursor,
        total
      };
    },
    getCompany: async id => {
      const CompanyModel = await getCompanyModel();

      const company = await CompanyModel.findById(id);

      return company;
    },
    updateCompany: async (id, company) => {
      const CompanyModel = await getCompanyModel();

      const { addImages, removeImages, ...rest } = company;

      const update: Record<string, unknown> = {};

      if (Object.keys(rest).length > 0) update["$set"] = rest;

      if (addImages && addImages.length > 0)
        update["$push"] = { images: { $each: addImages } };

      if (removeImages && removeImages.length > 0)
        update["$pull"] = { images: { assetId: { $in: removeImages } } };

      const updatedCategory = await CompanyModel.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true
      });

      return updatedCategory;
    }
  };
}

export interface GetUserModel {
  (): Promise<mongoose.Model<User>>;
}

/**
 * Builds a filter to get companies.
 * @param options - The options to get companies.
 * @param options.cursor - The cursor to get companies.
 * @param options.includePrivateCompanies - Whether to include private companies.
 * @param options.onlyRecommended - Whether to get only recommended companies.
 * @param options.sortBy - The field to sort companies by.
 * @param options.sortOrder - The order to sort companies by.
 * @param options.status - The status of the companies.
 * @returns The filter to get companies.
 */
function buildFilter({
  cursor,
  includePrivateCompanies = false,
  onlyRecommended = false,
  sortBy = "name",
  sortOrder = "asc",
  status
}: GetCompaniesOptions = {}): FilterQuery<Company> {
  const filter: Writable<FilterQuery<Company>> = {};

  if (cursor) {
    const [sortByValue, id] = cursor;

    const operatorMap = { asc: "$gt", desc: "$lt" } as const;

    const operator = operatorMap[sortOrder];

    filter["$or"] = [
      { [sortBy]: { [operator]: sortByValue } },
      { _id: { [operator]: id }, [sortBy]: sortByValue }
    ];
  }

  if (includePrivateCompanies) {
    // Include both public and private companies
  } else filter["privateCompany"] = { $ne: true };

  if (onlyRecommended) filter["recommended"] = true;

  if (status) filter["status"] = status;

  return filter;
}
