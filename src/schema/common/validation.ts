import { omit } from "lodash";
import zod from "zod";

export const DigitalDocumentValidationSchema = zod.object({
  assetId: zod.string(),
  secureUrl: zod.string().url(),
  signatures: zod.array(zod.string()),
  url: zod.string().url()
});

export const founder = zod
  .object({
    _id: zod.any().optional(),
    email: preprocessEmail(zod.string().email()),
    firstName: zod.string().min(1).nullable().optional(),
    lastName: zod.string().min(1).nullable().optional(),
    share: preprocessNumber(zod.number().int().positive()).nullable().optional()
  })
  .transform(obj => omit(obj, ["_id"]));

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
  firstName: zod.string().nullable().optional(),
  lastName: zod.string().nullable().optional()
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
