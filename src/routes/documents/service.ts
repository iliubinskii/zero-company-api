import type { Document, User } from "../../schema";
import {
  type DocumentsService,
  dangerouslyAssumePopulatedDocument,
  dangerouslyAssumePopulatedDocuments
} from "../../types";
import { getDocumentModel, getUserModel } from "../../schema-mongodb";
import type { FilterQuery } from "mongoose";
import { MAX_LIMIT } from "../../schema";
import type { Writable } from "ts-toolbelt/out/Object/Writable";
import { getDigitalDocument } from "../../providers";
import type mongoose from "mongoose";

/**
 * Creates a MongoDB service for documents.
 * @returns A MongoDB service for documents.
 */
export function createDocumentsService(): DocumentsService {
  return {
    addDocument: async data => {
      const DocumentModel = await getDocumentModel();

      const document = new DocumentModel(data);

      await document.save();
      await document.populate("company");

      return dangerouslyAssumePopulatedDocument(document);
    },
    deleteDocument: async id => {
      const DocumentModel = await getDocumentModel();

      const document = await DocumentModel.findByIdAndDelete(id);

      return document ? 1 : 0;
    },
    getDocument: async id => {
      const DocumentModel = await getDocumentModel();

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

      const DocumentModel = await getDocumentModel();

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
            const UserModel = await getUserModel();

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
      const DocumentModel = await getDocumentModel();

      const document = await DocumentModel.findById(id);

      if (document) {
        const digitalDocument = await getDigitalDocument(document.doc);

        await document
          .updateOne(
            { ...update, doc: digitalDocument },
            { new: true, runValidators: true }
          )
          .populate("company");

        return dangerouslyAssumePopulatedDocument(document);
      }

      return null;
    }
  };
}

export interface GetUserModel {
  (): Promise<mongoose.Model<User>>;
}
