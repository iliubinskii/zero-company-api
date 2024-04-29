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

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete,  security/detect-object-injection -- Ok
    if (value === undefined) delete result[key];
  }

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return result as FilterUndefinedProperties<T>;
}

export type FilterUndefinedProperties<T> = {
  [K in keyof T]: undefined extends T[K] ? never : T[K];
};
