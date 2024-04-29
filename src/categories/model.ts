import { Category } from "../schema";
import mongoose, { InferSchemaType } from "mongoose";

const Schema = new mongoose.Schema(
  {
    description: { required: true, type: String },
    name: { required: true, type: String },
    tagline: { required: true, type: String }
  },
  { versionKey: false }
);

export const CategoryModel = mongoose.model<Category>("Category", Schema);

/**
 * Type check
 * @param value - Value
 * @returns Value
 */
export function typeCheck(value: InferSchemaType<typeof Schema>): Category {
  return value;
}
