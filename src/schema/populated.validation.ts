import { ExistingCompanyValidationSchema } from "./companies.validation";
import { ExistingDocumentValidationSchema } from "./documents.validation";

export const PopulatedDocumentValidationSchema =
  ExistingDocumentValidationSchema.omit({
    company: true
  }).extend({
    company: ExistingCompanyValidationSchema.nullable().optional()
  });
