import type {
  Company,
  CompanyUpdate,
  GetCompaniesOptions,
  User
} from "../../schema";
import { filterUndefinedProperties, toObject } from "../../utils";
import type { CompaniesService } from "../../types";
import type { FilterQuery } from "mongoose";
import { MAX_LIMIT } from "../../schema";
import type { Writable } from "ts-toolbelt/out/Object/Writable";
import { createCrudService } from "../../services";
import { getCompanyModel } from "./model";
import type mongoose from "mongoose";

/**
 * Creates a MongoDB service for companies.
 * @param getUserModel - The function to get the user model.
 * @returns A MongoDB service for companies.
 */
export function createCompaniesService(
  getUserModel: GetUserModel
): CompaniesService {
  const crudService = createCrudService<Company, CompanyUpdate>(
    getCompanyModel
  );

  return {
    addCompany: crudService.addItemGuaranteed,
    crudService,
    deleteCompany: crudService.deleteItem,
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

      // eslint-disable-next-line no-warning-comments -- Postponed
      // TODO: Use a single aggregate query to get both the count and the documents
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

      return filterUndefinedProperties({
        count: companies.length,
        docs: companies.map(toObject),
        nextCursor:
          companies.length === limit && lastCompany
            ? [lastCompany[sortBy], lastCompany._id.toString()]
            : undefined,
        total
      });
    },
    getCompany: crudService.getItem,
    updateCompany: crudService.updateItem
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
