import type {
  Company,
  Document,
  GetCompaniesOptions,
  Signatory,
  User
} from "../../schema";
import { DocType, MAX_LIMIT } from "../../schema";
import { createDigitalDocument, getMongodbConnection } from "../../providers";
import { type CompaniesService } from "../../types";
import type { FilterQuery } from "mongoose";
import { FoundingAgreement } from "../../templates";
import { MONGODB_RUN_VALIDATORS } from "../../config";
import { StatusCodes } from "http-status-codes";
import type { Writable } from "ts-toolbelt/out/Object/Writable";
import { getModels } from "../../schema-mongodb";
import { lang } from "../../langs";
import type mongoose from "mongoose";

/**
 * Creates a MongoDB service for companies.
 * @returns A MongoDB service for companies.
 */
export function createCompaniesService(): CompaniesService {
  return {
    addCompany: async data => {
      const { CompanyModel } = await getModels();

      const company = new CompanyModel(data);

      await company.save();

      return company;
    },
    deleteCompany: async id => {
      const { CompanyModel } = await getModels();

      const company = await CompanyModel.findByIdAndDelete(id);

      return company ? 1 : 0;
    },
    generateFoundingAgreement: async id => {
      const { CompanyModel, DocumentModel } = await getModels();

      const connection = await getMongodbConnection();

      const session = await connection.startSession();

      session.startTransaction();

      try {
        const company = await CompanyModel.findById(id).session(session);

        if (company) {
          if (company.foundingAgreement) {
            await session.commitTransaction();
            await session.endSession();

            return StatusCodes.CONFLICT;
          }

          const signatories = company.founders.map(
            ({ email, name }, index): Signatory => {
              return {
                email,
                name,
                role: `${lang.Founder} ${index + 1}`
              };
            }
          );

          const digitalDocument = await createDigitalDocument(
            lang.FoundingAgreement,
            FoundingAgreement,
            signatories
          );

          const data: Document = {
            company: company._id.toString(),
            createdAt: new Date(),
            doc: digitalDocument,
            signatories: company.founders.map(
              ({ email, name }, index): Signatory => {
                return {
                  email,
                  name,
                  role: `${lang.Founder} ${index + 1}`
                };
              }
            ),
            type: DocType.FoundingAgreement
          };

          const document = new DocumentModel(data);

          await document.save({ session });
          company.foundingAgreement = document._id;
          await company.save({ session });
          await session.commitTransaction();

          return company;
        }

        await session.commitTransaction();

        return null;
      } catch (err) {
        await session.abortTransaction();

        throw err;
      } finally {
        await session.endSession();
      }
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

      const { CompanyModel } = await getModels();

      if (parentRef)
        switch (parentRef.type) {
          case "bookmarkUserEmail": {
            const { UserModel } = await getModels();

            const user = await UserModel.findOne({
              email: parentRef.bookmarkUserEmail
            });

            if (user) filter["_id"] = { $in: user.favoriteCompanies };
            else return { count: 0, docs: [], total: 0 };

            break;
          }

          case "bookmarkUserId": {
            const { UserModel } = await getModels();

            const user = await UserModel.findById(parentRef.bookmarkUserId);

            if (user) filter["_id"] = { $in: user.favoriteCompanies };
            else return { count: 0, docs: [], total: 0 };

            break;
          }

          case "category": {
            filter["categories"] = { $in: parentRef.category };

            break;
          }

          case "founderEmail": {
            filter["founders.email"] = { $in: parentRef.founderEmail };

            break;
          }

          case "founderId": {
            const { UserModel } = await getModels();

            const user = await UserModel.findById(parentRef.founderId);

            if (user) filter["founders.email"] = user.email;
            else return { count: 0, docs: [], total: 0 };
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
      const { CompanyModel } = await getModels();

      return CompanyModel.findById(id);
    },
    updateCompany: async (id, company) => {
      const { CompanyModel } = await getModels();

      const { addImages, removeImages, ...rest } = company;

      const update: Record<string, unknown> = {};

      if (Object.keys(rest).length > 0) update["$set"] = rest;

      if (addImages && addImages.length > 0)
        update["$push"] = { images: { $each: addImages } };

      if (removeImages && removeImages.length > 0)
        update["$pull"] = { images: { assetId: { $in: removeImages } } };

      return CompanyModel.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: MONGODB_RUN_VALIDATORS
      });
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
