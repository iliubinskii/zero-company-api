import type {
  DigitalDocument,
  DocumentType,
  MultipleDocsResponse,
  Signatory
} from "./common";

export interface Document {
  readonly company: string;
  readonly createdAt: Date;
  readonly doc: DigitalDocument;
  readonly metadata?: string | null | undefined;
  readonly signatories: readonly Signatory[];
  readonly type: DocumentType;
}

export interface DocumentCreate
  extends Pick<
    Document,
    "company" | "doc" | "metadata" | "signatories" | "type"
  > {}

export interface DocumentUpdate {}

export interface ExistingDocument extends Document {
  readonly _id: string;
}

export type ExistingDocuments = MultipleDocsResponse<ExistingDocument>;
