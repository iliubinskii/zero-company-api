import {
  DigitalDocumentValidationSchema,
  DocType,
  IdValidationSchema,
  SignatoryValidationSchema,
  preprocessDate
} from "./common";
import type {
  DocumentCreate,
  DocumentUpdate,
  ExistingDocument
} from "./documents";
import zod from "zod";

export const ExistingDocumentValidationSchema = zod.object({
  _id: IdValidationSchema,
  company: zod.string().min(1),
  createdAt: preprocessDate(zod.date()),
  doc: DigitalDocumentValidationSchema,
  metadata: zod.string().min(1).nullable().optional(),
  signatories: zod.array(SignatoryValidationSchema).nonempty(),
  type: zod.enum([DocType.FoundingAgreement])
});

export const DocumentCreateValidationSchema =
  ExistingDocumentValidationSchema.pick({
    company: true,
    doc: true,
    metadata: true,
    signatories: true,
    type: true
  });

export const DocumentUpdateValidationSchema = zod.object({});

// Type check the existing document validation schema
((): ExistingDocument | undefined => {
  const result = ExistingDocumentValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the document create validation schema
((): DocumentCreate | undefined => {
  const result = DocumentCreateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the document update validation schema
((): DocumentUpdate | undefined => {
  const result = DocumentUpdateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();
