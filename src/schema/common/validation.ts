import zod from "zod";

export const DigitalDocumentValidationSchema = zod.object({
  embedSrc: zod.string().url(),
  signatures: zod.array(zod.string().min(1)),
  submissionId: preprocessNumber(zod.number())
});

export const FounderValidationSchema = zod.object({
  email: preprocessEmail(zod.string().email()),
  name: zod.string().min(1).nullable().optional(),
  share: preprocessNumber(zod.number().int().positive()).nullable().optional()
});

export const IdValidationSchema = zod
  .string()
  .refine(value => /^[\da-f]{24}$/u.test(value));

export const ImageValidationSchema = zod.object({
  assetId: zod.string().min(1),
  height: preprocessNumber(zod.number().int().positive()),
  name: zod.string().min(1),
  secureUrl: zod.string().min(1),
  url: zod.string().min(1),
  width: preprocessNumber(zod.number().int().positive())
});

export const SignatoryValidationSchema = zod.object({
  email: zod.string().email(),
  name: zod.string().min(1).nullable().optional(),
  role: zod.string().min(1)
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
export function preprocessNumber<T extends zod.ZodTypeAny>(
  schema: T
): zod.ZodEffects<T> {
  return zod.preprocess(
    value => (typeof value === "string" ? Number(value) : value),
    schema
  );
}
