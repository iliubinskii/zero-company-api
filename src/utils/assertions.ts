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
 * Asserts that a value is an HTMLFormElement.
 * @param value - The value to check.
 * @returns The value if it is an HTMLFormElement.
 */
export function assertHTMLFormElement(value: EventTarget): HTMLFormElement {
  if (value instanceof HTMLFormElement) return value;

  throw new Error("Value is not an HTMLFormElement");
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
 * Asserts that a value is a string.
 * @param value - The value to check.
 * @returns The value if it is a string.
 * @throws An error if the value is not a string.
 */
export function assertString(value: unknown): string {
  if (typeof value === "string") return value;

  throw new Error("Value is undefined");
}
