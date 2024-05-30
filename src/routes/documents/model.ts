import { DocType, type Document } from "../../schema";
import type { Equals } from "ts-toolbelt/out/Any/Equals";
import { getMongodbConnection } from "../../providers";
import mongoose from "mongoose";

const Schema = {
  company: { required: true, type: String },
  createdAt: { required: true, type: String },
  doc: {
    type: {
      assetId: { required: true, type: String },
      secureUrl: { required: true, type: String },
      signatures: { required: true, type: [String] },
      url: { required: true, type: String }
    }
  },
  metadata: { type: String },
  signatories: {
    required: true,
    type: [
      {
        email: { required: true, type: String },
        firstName: { type: String },
        lastName: { type: String }
      }
    ]
  },
  type: { enum: Object.values(DocType), required: true, type: String }
} as const;

export const getDocumentModel: GetDocumentModel = createSingleton();

export interface GetDocumentModel {
  (): Promise<mongoose.Model<Document>>;
}

/**
 * Creates a document model singleton.
 * @returns A document model singleton.
 */
function createSingleton(): GetDocumentModel {
  let model: mongoose.Model<Document> | undefined;

  return async () => {
    const connection = await getMongodbConnection();

    model =
      model ??
      connection.model<Document>(
        "Document",
        new mongoose.Schema<Document>(Schema, { versionKey: false })
      );

    return model;
  };
}

// Type check the document schema
((): Equals<keyof typeof Schema, keyof Document> => 1)();
