import type {
  DigitalDocument,
  DocType,
  MultipleDocsResponse,
  Signatory,
  Update
} from "./common";

export interface Document {
  readonly company: string;
  readonly createdAt: Date;
  readonly doc?: DigitalDocument | null | undefined;
  readonly metadata?: string | null | undefined;
  readonly signatories: readonly Signatory[];
  readonly type: DocType;
}

export interface DocumentCreate
  extends Pick<Document, "company" | "metadata" | "signatories" | "type"> {}

export interface DocumentUpdate extends Update<Pick<Document, "doc">> {}

export interface ExistingDocument extends Document {
  readonly _id: string;
}

export type ExistingDocuments = MultipleDocsResponse<ExistingDocument>;
