/**
 * Build a MongoDB query object from a plain object.
 * @param obj - The object to convert.
 * @returns The MongoDB query object.
 */
export function buildMongodbQuery(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const $set: Record<string, unknown> = {};

  const $unset: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj))
    if (value === null) $unset[key] = value;
    else $set[key] = value;

  return { $set, $unset };
}
