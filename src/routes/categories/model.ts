import { Category } from "../../schema";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import mongoose from "mongoose";

const Schema = {
  description: { required: true, type: String },
  name: { required: true, type: String },
  tagline: { required: true, type: String }
};

export const CategoryModel = mongoose.model<Category>(
  "Category",

  new mongoose.Schema<Category>(Schema, { versionKey: false })
);

// Type check the company schema
((): Equals<keyof typeof Schema, keyof Category> => {
  return 1;
})();
