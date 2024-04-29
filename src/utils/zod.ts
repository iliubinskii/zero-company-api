import zod from "zod";

/**
 * Preprocesses a schema to convert string values to booleans.
 * @param schema - The schema to preprocess.
 * @returns The preprocessed schema.
 */
export function preprocessBoolean<T extends zod.ZodTypeAny>(schema: T) {
  return zod.preprocess(value => {
    if (typeof value === "string")
      switch (value.toLowerCase()) {
        case "true": {
          return true;
        }

        case "false": {
          return false;
        }
      }

    return value;
  }, schema);
}

/**
 * Preprocesses a schema to convert string values to numbers.
 * @param schema - The schema to preprocess.
 * @returns The preprocessed schema.
 */
export function preprocessNumber<T extends zod.ZodTypeAny>(schema: T) {
  return zod.preprocess(value => {
    return typeof value === "string" ? Number(value) : value;
  }, schema);
}
