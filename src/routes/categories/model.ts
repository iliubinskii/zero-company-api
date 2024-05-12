import { Category } from "../../schema";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import { getMongodbConnection } from "../../providers";
import mongoose from "mongoose";

const Schema = {
  description: { required: true, type: String },
  name: { required: true, type: String },
  tagline: { required: true, type: String }
};

export const getCategoryModel: GetCategoryModel = createSingleton();

export interface GetCategoryModel {
  (): Promise<mongoose.Model<Category>>;
}

/**
 * Creates a category model singleton.
 * @returns A category model singleton.
 */
function createSingleton(): GetCategoryModel {
  let model: mongoose.Model<Category> | undefined;

  return async () => {
    const connection = await getMongodbConnection();

    model =
      model ??
      connection.model<Category>(
        "Category",
        new mongoose.Schema<Category>(Schema, { versionKey: false })
      );

    return model;
  };
}

// Type check the category schema
((): Equals<keyof typeof Schema, keyof Category> => 1)();
