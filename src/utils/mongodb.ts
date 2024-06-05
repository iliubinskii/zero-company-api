import type mongoose from "mongoose";

/**
 * Build a MongoDB query object from a plain object.
 * @param obj - The object to convert.
 * @returns The MongoDB query object.
 */
export function buildMongodbQuery<ITEM extends object>(
  obj: ITEM
): Record<string, unknown> {
  const $set: Record<string, unknown> = {};

  const $unset: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj))
    if (value === null) $unset[key] = value;
    else $set[key] = value;

  return { $set, $unset };
}

/**
 * Converts a Mongoose document to a plain object.
 * @param doc - The Mongoose document to convert.
 * @returns The plain object.
 */
export function toObject<T extends mongoose.Document>(
  doc: T
): T & { _id: string } {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const result = doc.toObject() as T & { _id: mongoose.Types.ObjectId };

  return { ...result, _id: result._id.toString() };
}
