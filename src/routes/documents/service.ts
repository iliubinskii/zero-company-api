import type { Document, DocumentUpdate, User } from "../../schema";
import type { DocumentsService } from "../../types";
import type { FilterQuery } from "mongoose";
import { MAX_LIMIT } from "../../schema";
import type { Writable } from "ts-toolbelt/out/Object/Writable";
import { createCrudService } from "../../services";
import { getDocumentModel } from "./model";
import type mongoose from "mongoose";
import { toObject } from "../../utils";

/**
 * Creates a MongoDB service for documents.
 * @param getUserModel - The function to get the user model.
 * @returns A MongoDB service for documents.
 */
export function createDocumentsService(
  getUserModel: GetUserModel
): DocumentsService {
  const crudService = createCrudService<Document, DocumentUpdate>(
    getDocumentModel
  );

  return {
    addDocument: crudService.addItemGuaranteed,
    crudService,
    deleteDocument: crudService.deleteItem,
    getDocument: crudService.getItem,
    getDocuments: async (options = {}, parentRef) => {
      const { limit = MAX_LIMIT, offset = 0 } = options;

      const filter: Writable<FilterQuery<Document>> = {};

      const DocumentModel = await getDocumentModel();

      if (parentRef)
        switch (parentRef.type) {
          case "company": {
            filter["companies"] = { $in: parentRef.company };

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
      const [documents, total] = await Promise.all([
        DocumentModel.find(filter).skip(offset).limit(limit),
        DocumentModel.countDocuments(filter)
      ]);

      return {
        count: documents.length,
        docs: documents.map(toObject),
        total
      };
    },
    updateDocument: crudService.updateItem
  };
}

export interface GetUserModel {
  (): Promise<mongoose.Model<User>>;
}
