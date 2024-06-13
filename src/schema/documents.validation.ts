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

const _id = IdValidationSchema;

const company = zod.string().min(1);

const createdAt = preprocessDate(zod.date());

const doc = DigitalDocumentValidationSchema;

const metadata = zod.string().min(1).nullable().optional();

const signatories = zod.array(SignatoryValidationSchema).nonempty();

const type = zod.enum([DocType.FoundingAgreement]);

export const ExistingDocumentValidationSchema = zod.object({
  _id,
  company,
  createdAt,
  doc,
  metadata,
  signatories,
  type
});

export const DocumentCreateValidationSchema = zod.object({
  company,
  doc,
  metadata,
  signatories,
  type
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
