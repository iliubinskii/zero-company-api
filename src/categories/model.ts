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

export const CategoryModel: mongoose.Model<Category> = mongoose.model<Category>(
  "Category",
  Schema
);

typeCheck({
  description: "",
  name: "",
  tagline: ""
});

/**
 * Type check
 * @param value - Value
 * @returns Value
 */
function typeCheck(value: InferSchemaType<typeof Schema>): Category {
  return value;
}
