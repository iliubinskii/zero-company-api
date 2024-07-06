import { CompanyStatus, DocType, MAX_LIMIT } from "../../schema";
import type { Document, User } from "../../schema";
import {
  type DocumentsService,
  dangerouslyAssumePopulatedDocument,
  dangerouslyAssumePopulatedDocuments
} from "../../types";
import { getDigitalDocument, getMongodbConnection } from "../../providers";
import type { FilterQuery } from "mongoose";
import { MONGODB_RUN_VALIDATORS } from "../../config";
import type { Writable } from "ts-toolbelt/out/Object/Writable";
import { getModels } from "../../schema-mongodb";
import type mongoose from "mongoose";

/**
 * Creates a MongoDB service for documents.
 * @returns A MongoDB service for documents.
 */
export function createDocumentsService(): DocumentsService {
  return {
    addDocument: async data => {
      const { DocumentModel } = await getModels();

      const document = new DocumentModel(data);

      await document.save();
      await document.populate("company");

      return dangerouslyAssumePopulatedDocument(document);
    },
    deleteDocument: async id => {
      const { DocumentModel } = await getModels();

      const document = await DocumentModel.findByIdAndDelete(id);

      return document ? 1 : 0;
    },
    getDocument: async id => {
      const { DocumentModel } = await getModels();

      const document = await DocumentModel.findById(id).populate("company");

      return document ? dangerouslyAssumePopulatedDocument(document) : null;
    },
    getDocuments: async (options = {}, parentRef) => {
      const {
        limit = MAX_LIMIT,
        offset = 0,
        sortBy = "createdAt",
        sortOrder = "asc"
      } = options;

      const filter: Writable<FilterQuery<Document>> = {};

      const mongodbSortOrderMap = { asc: 1, desc: -1 } as const;

      const mongodbSortOrder = mongodbSortOrderMap[sortOrder];

      const { DocumentModel } = await getModels();

      if (parentRef)
        switch (parentRef.type) {
          case "company": {
            filter["companies"] = { $in: parentRef.company };

            break;
          }

          case "signatoryEmail": {
            filter["signatories.email"] = { $in: parentRef.signatoryEmail };

            break;
          }

          case "signatoryId": {
            const { UserModel } = await getModels();

            const user = await UserModel.findById(parentRef.signatoryId);

            if (user) filter["signatories.email"] = user.email;
            else return { count: 0, docs: [], total: 0 };
          }
        }

      const [documents, total] = await Promise.all([
        DocumentModel.find(filter)
          .skip(offset)
          .limit(limit)
          .sort(
            Object.fromEntries([
              [sortBy, mongodbSortOrder],
              ["_id", mongodbSortOrder]
            ])
          )
          .populate("company"),
        DocumentModel.countDocuments(filter)
      ]);

      return dangerouslyAssumePopulatedDocuments({
        count: documents.length,
        docs: documents,
        total
      });
    },
    updateDocument: async (id, update) => {
      const { CompanyModel, DocumentModel } = await getModels();

      const connection = await getMongodbConnection();

      const session = await connection.startSession();

      session.startTransaction();

      try {
        const document = await DocumentModel.findById(id).session(session);

        if (document) {
          const digitalDocument = await getDigitalDocument(
            document.toObject().doc
          );

          if (
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Ok
            document.type === DocType.FoundingAgreement &&
            digitalDocument.status === "completed"
          )
            await CompanyModel.findByIdAndUpdate(
              document.company._id,
              { status: CompanyStatus.founded },
              { new: true, runValidators: MONGODB_RUN_VALIDATORS }
            ).session(session);

          const updatedDocument = await DocumentModel.findByIdAndUpdate(
            id,
            { ...update, doc: digitalDocument },
            { new: true, runValidators: MONGODB_RUN_VALIDATORS }
          )
            .session(session)
            .populate("company");

          await session.commitTransaction();

          return updatedDocument
            ? dangerouslyAssumePopulatedDocument(updatedDocument)
            : null;
        }

        await session.commitTransaction();

        return null;
      } catch (err) {
        await session.abortTransaction();

        throw err;
      } finally {
        await session.endSession();
      }
    }
  };
}

export interface GetUserModel {
  (): Promise<mongoose.Model<User>>;
}
