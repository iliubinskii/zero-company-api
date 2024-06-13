import { digitalDocument, signatory } from "./common";
import { DocType } from "../schema";
import { getMongodbConnection } from "../providers";
import mongoose from "mongoose";

export const DocumentSchema = new mongoose.Schema(
  {
    company: {
      required: true,
      type: mongoose.Schema.Types.String
    },
    createdAt: {
      required: true,
      type: mongoose.Schema.Types.Date
    },
    doc: {
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
 * @returns A document model.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
export async function getDocumentModel() {
  const connection = await getMongodbConnection();

  return connection.model("Document", DocumentSchema);
}

export type DocumentModel = Awaited<ReturnType<typeof getDocumentModel>>;
