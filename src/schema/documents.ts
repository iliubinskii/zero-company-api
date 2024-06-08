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
  readonly doc?: DigitalDocument | undefined;
  readonly metadata?: string | undefined;
  readonly signatories: readonly Signatory[];
  readonly type: DocType;
}

export interface DocumentCreate extends Document {}

export interface DocumentUpdate extends Update<Pick<Document, "doc">> {}

export interface ExistingDocument extends Document {
  readonly _id: string;
}

export type ExistingDocuments = MultipleDocsResponse<ExistingDocument>;
