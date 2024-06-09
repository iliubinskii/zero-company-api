import type { JsonTransform } from "../schema";

/**
 * Asserts that a value is defined.
 * @param value - The value to check.
 * @returns The value if it is defined.
 * @throws An error if the value is undefined.
 */
export function assertDefined<T>(value: T | undefined): T {
  if (value === undefined) throw new Error("Value is undefined");

  return value;
}

/**
 * Asserts that a value is not null.
 * @param value - The value to check.
 * @returns The value if it is not null.
 * @throws An error if the value is null.
 */
export function assertNotNull<T>(value: T | null): T {
  if (value === null) throw new Error("Value is null");

  return value;
}

/**
 * Asserts that a value is a number.
 * @param value - The value to check.
 * @returns The value if it is a number.
 * @throws An error if the value is not a number.
 */
export function assertNumber(value: unknown): number {
  if (typeof value === "number") return value;

  throw new Error("Value is not a number");
}

/**
 * Asserts that a value is a string.
 * @param value - The value to check.
 * @returns The value if it is a string.
 * @throws An error if the value is not a string.
 */
export function assertString(value: unknown): string {
  if (typeof value === "string") return value;

  throw new Error("Value is not a string");
}

/**
 * Asserts that the value is valid for JSON.stringify.
 * @param value - The value to assert.
 * @returns The value.
 */
export function assertValidForJsonStringify<T>(value: T): JsonTransform<T> {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return value as JsonTransform<T>;
}
