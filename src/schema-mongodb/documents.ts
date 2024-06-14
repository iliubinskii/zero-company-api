import { digitalDocument, signatory } from "./common";
import { DocType } from "../schema";
import mongoose from "mongoose";

export const DocumentSchema = new mongoose.Schema(
  {
    company: {
      ref: "Company",
      required: true,
      type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
      required: true,
      type: mongoose.Schema.Types.Date
    },
    doc: {
      required: true,
      type: digitalDocument
    },
    metadata: {
      type: mongoose.Schema.Types.String
    },
    signatories: {
      required: true,
      type: [signatory]
    },
    type: {
      enum: Object.values(DocType),
      required: true,
      type: mongoose.Schema.Types.String
    }
  },
  { versionKey: false }
);

/**
 * Creates a document model.
 * @param connection - The mongoose connection.
 * @returns A document model.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
export function getDocumentModel(connection: typeof mongoose) {
  return connection.model("Document", DocumentSchema);
}

export type DocumentModel = ReturnType<typeof getDocumentModel>;
