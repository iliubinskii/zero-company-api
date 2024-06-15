import { ExistingCompanyValidationSchema } from "./companies.validation";
import { ExistingDocumentValidationSchema } from "./documents.validation";
import type { PopulatedDocument } from "./populated";

export const PopulatedDocumentValidationSchema =
  ExistingDocumentValidationSchema.omit({
    company: true
  }).extend({
    company: ExistingCompanyValidationSchema.nullable().optional()
  });

// Type check the populated document validation schema
((): PopulatedDocument | undefined => {
  const result = PopulatedDocumentValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();
