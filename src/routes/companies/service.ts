import type {
  Company,
  Document,
  GetCompaniesOptions,
  Signatory,
  User
} from "../../schema";
import { DocType, MAX_LIMIT } from "../../schema";
import { createDigitalDocument, getMongodbConnection } from "../../providers";
import {
  getCompanyModel,
  getDocumentModel,
  getUserModel
} from "../../schema-mongodb";
import type { CompaniesService } from "../../types";
import type { FilterQuery } from "mongoose";
import { FoundingAgreement } from "../../templates";
import { StatusCodes } from "http-status-codes";
import type { Writable } from "ts-toolbelt/out/Object/Writable";
import { lang } from "../../langs";
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

      const addedCompany = await model.save();

      return addedCompany;
    },
    deleteCompany: async id => {
      const CompanyModel = await getCompanyModel();

      const deletedCompany = await CompanyModel.findByIdAndDelete(id);

      return deletedCompany ? 1 : 0;
    },
    generateFoundingAgreement: async id => {
      const connection = await getMongodbConnection();

      const CompanyModel = await getCompanyModel();

      const DocumentModel = await getDocumentModel();

      const session = await connection.startSession();

      session.startTransaction();

      try {
        const company = await CompanyModel.findById(id).session(session);

        if (!company) {
          await session.abortTransaction();
          await session.endSession();

          return null;
        }

        if (company.foundingAgreement) {
          await session.abortTransaction();
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

        const document: Document = {
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

        const addedDocument = new DocumentModel(document);

        company.foundingAgreement = addedDocument._id;

        await company.save({ session });

        await session.commitTransaction();
        await session.endSession();

        return addedDocument;
      } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
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

      const CompanyModel = await getCompanyModel();

      if (parentRef)
        switch (parentRef.type) {
          case "bookmarkUserEmail": {
            const UserModel = await getUserModel();

            const user = await UserModel.findOne({
              email: parentRef.bookmarkUserEmail
            });

            if (user) filter["_id"] = { $in: user.favoriteCompanies };
            else
              return {
                count: 0,
                docs: [],
                total: 0
              };

            break;
          }

          case "bookmarkUserId": {
            const UserModel = await getUserModel();

            const user = await UserModel.findById(parentRef.bookmarkUserId);

            if (user) filter["_id"] = { $in: user.favoriteCompanies };
            else
              return {
                count: 0,
                docs: [],
                total: 0
              };

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

      const updatedCompany = await CompanyModel.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true
      });

      return updatedCompany;
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
