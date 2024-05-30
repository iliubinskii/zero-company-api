/**
 * Filters the undefined properties from an object.
 * @param obj - The object to filter.
 * @returns The object without the undefined properties.
 */
export function filterUndefinedProperties<T>(
  obj: T
): FilterUndefinedProperties<T> {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return obj as FilterUndefinedProperties<T>;
}

export type FilterUndefinedProperties<T> = {
  [K in keyof T]: undefined extends T[K]
    ? never
    : FilterUndefinedProperties<T[K]>;
};
