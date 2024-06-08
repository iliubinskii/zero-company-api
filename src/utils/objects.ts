import { set } from "lodash";

/**
 * Parse object with nested keys (e.g. "founders[0].name").
 * @param obj - Object to parse.
 * @returns Parsed object.
 */
export function parseNestingKeys<T>(
  obj: Readonly<Record<string, T>>
): Record<string, T> {
  const result: Record<string, T> = {};

  for (const [key, value] of Object.entries(obj)) set(result, key, value);

  return result;
}

export type FilterUndefinedProperties<T> = {
  [K in keyof T]: undefined extends T[K] ? never : T[K];
};

export type FilterUndefinedPropertiesDeep<T> = {
  [K in keyof T]: undefined extends T[K]
    ? never
    : FilterUndefinedPropertiesDeep<T[K]>;
};
