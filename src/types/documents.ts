import type {
  Document,
  DocumentUpdate,
  ExistingDocument,
  GetDocumentsOptions,
  MultipleDocsResponse
} from "../schema";
import type { RawExistingCompany } from "./companies";
import type { RequestHandler } from "express";
import type mongoose from "mongoose";

/**
 * Casts a raw existing document to a raw populated document.
 * @param value - The raw existing document to cast.
 * @returns The raw populated document.
 */
export function dangerouslyAssumePopulatedDocument(
  value: RawExistingDocument
): RawPopulatedDocument {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return value as unknown as RawPopulatedDocument;
}

/**
 * Casts raw existing documents to raw populated documents.
 * @param value - The raw existing documents to cast.
 * @returns The raw populated documents.
 */
export function dangerouslyAssumePopulatedDocuments(
  value: RawExistingDocuments
): RawPopulatedDocuments {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return value as unknown as RawPopulatedDocuments;
}

export interface DocumentControllers {
  readonly addDocument: RequestHandler;
  readonly deleteDocument: RequestHandler;
  readonly getDocument: RequestHandler;
  readonly getDocuments: RequestHandler;
  readonly updateDocument: RequestHandler;
}

export interface DocumentsService {
  /**
   * Adds a document to the database.
   * @param document - The document to add.
   * @returns A promise that resolves when the document has been added.
   */
  readonly addDocument: (document: Document) => Promise<RawPopulatedDocument>;
  /**
   * Deletes a document from the database.
   * @param id - The ID of the document to delete.
   * @returns A promise that resolves with the number of affected rows.
   */
  readonly deleteDocument: (id: string) => Promise<number>;
  /**
   * Gets a document from the database.
   * @param id - The ID of the document to get.
   * @returns A promise that resolves with the document, or `null` if the document was not found.
   */
  readonly getDocument: (id: string) => Promise<RawPopulatedDocument | null>;
  /**
   * Gets all documents from the database.
   * @param options - The options to use when getting documents.
   * @returns A promise that resolves with all documents in the database.
   */
  readonly getDocuments: (
    options?: GetDocumentsOptions,
    parentRef?: GetDocumentsParentRef
  ) => Promise<RawPopulatedDocuments>;
  /**
   * Updates a document in the database.
   * @param id - The ID of the document to update.
   * @param document - The document data to update.
   * @returns A promise that resolves with the updated document, or `null` if the document was not found.
   */
  readonly updateDocument: (
    id: string,
    document: DocumentUpdate
  ) => Promise<RawPopulatedDocument | null>;
}

export type GetDocumentsParentRef =
  | {
      readonly company: string;
      readonly type: "company";
    }
  | {
      readonly signatoryEmail: string;
      readonly type: "signatoryEmail";
    }
  | {
      readonly signatoryId: string;
      readonly type: "signatoryId";
    };

export interface RawExistingDocument
  extends Omit<ExistingDocument, "_id" | "company"> {
  readonly _id: mongoose.Types.ObjectId;
  readonly company: mongoose.Types.ObjectId;
}

export type RawExistingDocuments = MultipleDocsResponse<RawExistingDocument>;

export interface RawPopulatedDocument
  extends Omit<ExistingDocument, "_id" | "company"> {
  readonly _id: mongoose.Types.ObjectId;
  readonly company: RawExistingCompany;
}

export type RawPopulatedDocuments = MultipleDocsResponse<RawPopulatedDocument>;
