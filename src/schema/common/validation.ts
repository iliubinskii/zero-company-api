import zod from "zod";

export const IdValidationSchema = zod
  .string()
  .refine(value => /^[\da-f]{24}$/u.test(value));

export const FounderValidationSchema = zod.object({
  email: preprocessEmail(zod.string().email()),
  name: zod.string().min(1).nullable().optional(),
  share: preprocessInt(zod.number().int().positive()).nullable().optional()
});

export const ImageValidationSchema = zod.object({
  assetId: zod.string().min(1),
  height: preprocessInt(zod.number().int().positive()),
  name: zod.string().min(1),
  secureUrl: zod.string().min(1),
  url: zod.string().min(1),
  width: preprocessInt(zod.number().int().positive())
});

export const SignatoryValidationSchema = zod.object({
  email: zod.string().email(),
  name: zod.string().min(1).nullable().optional(),
  role: zod.string().min(1)
});

export const SignatureValidationSchema = zod.object({
  email: preprocessEmail(zod.string().email()),
  embedSrc: zod.string().url(),
  name: zod.string().min(1).nullable().optional(),
  role: zod.string().min(1),
  status: zod.string().min(1)
});

export const DigitalDocumentValidationSchema = zod.object({
  signatures: zod.array(SignatureValidationSchema).nonempty(),
  submissionId: preprocessInt(zod.number().int().positive())
});

/**
 * Preprocesses a schema to convert string values to booleans.
 * @param schema - The schema to preprocess.
 * @returns The preprocessed schema.
 */
export function preprocessBoolean<T extends zod.ZodTypeAny>(
  schema: T
): zod.ZodEffects<T> {
  return zod.preprocess(value => {
    if (typeof value === "string")
      switch (value.toLowerCase()) {
        case "true":
        case "yes":
        case "on": {
          return true;
        }

        case "false":
        case "no":
        case "off": {
          return false;
        }
      }

    return value;
  }, schema);
}

/**
 * Preprocesses a schema to convert string values to dates.
 * @param schema - The schema to preprocess.
 * @returns The preprocessed schema.
 */
export function preprocessDate<T extends zod.ZodTypeAny>(
  schema: T
): zod.ZodEffects<T> {
  return zod.preprocess(
    value => (typeof value === "string" ? new Date(value) : value),
    schema
  );
}

/**
 * Preprocesses a schema to unify emails (lowercase).
 * @param schema - The schema to preprocess.
 * @returns The preprocessed schema.
 */
export function preprocessEmail<T extends zod.ZodTypeAny>(
  schema: T
): zod.ZodEffects<T> {
  return zod.preprocess(
    value => (typeof value === "string" ? value.toLowerCase() : value),
    schema
  );
}

/**
 * Preprocesses a schema to convert string values to numbers.
 * @param schema - The schema to preprocess.
 * @returns The preprocessed schema.
 */
export function preprocessInt<T extends zod.ZodTypeAny>(
  schema: T
): zod.ZodEffects<T> {
  return zod.preprocess(value => {
    switch (typeof value) {
      case "number": {
        return Math.round(value);
      }

      case "string": {
        return Math.round(Number(value));
      }

      default: {
        return value;
      }
    }
  }, schema);
}
