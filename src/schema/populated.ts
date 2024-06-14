import type { ExistingCompany } from "./companies";
import type { ExistingDocument } from "./documents";
import type { MultipleDocsResponse } from "./common";

export interface PopulatedDocument extends Omit<ExistingDocument, "company"> {
  readonly company: ExistingCompany;
}

export type PopulatedDocuments = MultipleDocsResponse<PopulatedDocument>;
