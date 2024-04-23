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
 * Filters the undefined properties from an object.
 * @param obj - The object to filter.
 * @returns The object without the undefined properties.
 */
export function filterUndefinedProperties<T>(
  obj: T
): FilterUndefinedProperties<T> {
  const result = { ...obj };

  for (const key in result) {
    // eslint-disable-next-line security/detect-object-injection -- Ok
    const value = result[key];

    if (value !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete,  security/detect-object-injection -- Ok
      delete result[key];
    }
  }

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return result as FilterUndefinedProperties<T>;
}

export type FilterUndefinedProperties<T> = {
  [K in keyof T]: undefined extends T[K] ? never : T[K];
};
