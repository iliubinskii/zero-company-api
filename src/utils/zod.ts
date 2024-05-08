import zod from "zod";

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
        case "on": {
          return true;
        }

        case "false":
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
