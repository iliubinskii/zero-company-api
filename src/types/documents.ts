import type {
  Document,
  DocumentUpdate,
  ExistingDocument,
  GetDocumentsOptions,
  MultipleDocsResponse
} from "../schema";
import type { RequestHandler } from "express";
import type mongoose from "mongoose";

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
  readonly addDocument: (document: Document) => Promise<RawExistingDocument>;
  /**
   * Deletes a document from the database.
   * @param id - The ID of the document to delete.
   * @returns A promise that resolves with the number of affected rows.
   */
  readonly deleteDocument: (id: string) => Promise<number>;
  /**
   * Gets a document from the database.
   * @param id - The ID of the document to get.
   * @returns A promise that resolves with the document, or `undefined` if the document was not found.
   */
  readonly getDocument: (id: string) => Promise<RawExistingDocument | null>;
  /**
   * Gets all documents from the database.
   * @param options - The options to use when getting documents.
   * @returns A promise that resolves with all documents in the database.
   */
  readonly getDocuments: (
    options?: GetDocumentsOptions,
    parentRef?: GetDocumentsParentRef
  ) => Promise<RawExistingDocuments>;
  /**
   * Updates a document in the database.
   * @param id - The ID of the document to update.
   * @param document - The document data to update.
   * @returns A promise that resolves with the updated document, or `undefined` if the document was not found.
   */
  readonly updateDocument: (
    id: string,
    document: DocumentUpdate
  ) => Promise<RawExistingDocument | null>;
}

export type GetDocumentsParentRef =
  | {
      readonly company: string;
      readonly type: "company";
    }
  | {
      readonly founderEmail: string;
      readonly type: "founderEmail";
    }
  | {
      readonly founderId: string;
      readonly type: "founderId";
    };

export interface RawExistingDocument extends Omit<ExistingDocument, "_id"> {
  readonly _id: mongoose.Types.ObjectId;
}

export type RawExistingDocuments = MultipleDocsResponse<RawExistingDocument>;
