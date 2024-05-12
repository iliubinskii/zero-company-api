import zod from "zod";

export const EmailValidationSchema = preprocessEmail(zod.string().email());

export const IdValidationSchema = zod
  .string()
  .refine(value => /^[\da-f]{24}$/u.test(value));

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
