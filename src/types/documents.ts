import type {
  Document,
  DocumentUpdate,
  ExistingDocument,
  GetDocumentsOptions,
  MultipleDocsResponse
} from "../schema";
import type { CrudService } from "./crud";
import type { RequestHandler } from "express";

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
  readonly addDocument: (document: Document) => Promise<ExistingDocument>;
  readonly crudService: CrudService<Document, DocumentUpdate>;
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
  readonly getDocument: (id: string) => Promise<ExistingDocument | undefined>;
  /**
   * Gets all documents from the database.
   * @param options - The options to use when getting documents.
   * @returns A promise that resolves with all documents in the database.
   */
  readonly getDocuments: (
    options?: GetDocumentsOptions,
    parentRef?: GetDocumentsParentRef
  ) => Promise<MultipleDocsResponse<ExistingDocument>>;
  /**
   * Updates a document in the database.
   * @param id - The ID of the document to update.
   * @param document - The document data to update.
   * @returns A promise that resolves with the updated document, or `undefined` if the document was not found.
   */
  readonly updateDocument: (
    id: string,
    document: DocumentUpdate
  ) => Promise<ExistingDocument | undefined>;
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
