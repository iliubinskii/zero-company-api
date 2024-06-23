import type { JsonTransform } from "../schema";

/**
 * Asserts that the value is valid for JSON.stringify.
 * @param value - The value to assert.
 * @returns The value.
 */
export function dangerouslyAssumeJsonTransform<T>(value: T): JsonTransform<T> {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return value as JsonTransform<T>;
}

/**
 * Clones an object using JSON.
 * @param obj - The object to clone.
 * @returns The cloned object.
 */
export function jsonTransform<T>(obj: T): JsonTransform<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, unicorn/prefer-structured-clone -- Ok
  return JSON.parse(JSON.stringify(obj));
}
