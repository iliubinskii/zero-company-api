import {
  DigitalDocumentValidationSchema,
  DocType,
  IdValidationSchema,
  SignatoryValidationSchema
} from "./common";
import type {
  DocumentCreate,
  DocumentUpdate,
  ExistingDocument
} from "./documents";
import zod from "zod";

const _id = IdValidationSchema;

const company = zod.string().min(1);

const createdAt = zod.date();

const doc = DigitalDocumentValidationSchema.nullable().optional();

const metadata = zod.string().min(1).nullable().optional();

const signatories = zod.array(SignatoryValidationSchema).nonempty();

const type = zod.enum([DocType.FoundingAgreement]);

export const ExistingDocumentValidationSchema = zod.strictObject({
  _id,
  company,
  createdAt,
  doc,
  metadata,
  signatories,
  type
});

export const DocumentCreateValidationSchema =
  ExistingDocumentValidationSchema.omit({ _id: true });

export const DocumentUpdateValidationSchema = zod.strictObject({
  doc: doc.optional()
});

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
