import { Category } from "../../schema";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import { getMongodbConnection } from "../../providers";
import mongoose from "mongoose";

const Schema = {
  description: { required: true, type: String },
  name: { required: true, type: String },
  tagline: { required: true, type: String }
};

export const { getCategoryModel } = categoryModelSingleton();

/**
 * Creates a category model singleton.
 * @returns A category model singleton.
 */
function categoryModelSingleton(): CategoryModelSingleton {
  let model: mongoose.Model<Category> | undefined;

  return {
    getCategoryModel: async (): Promise<mongoose.Model<Category>> => {
      const connection = await getMongodbConnection();

      model =
        model ??
        connection.model<Category>(
          "Category",
          new mongoose.Schema<Category>(Schema, { versionKey: false })
        );

      return model;
    }
  };
}

interface CategoryModelSingleton {
  readonly getCategoryModel: () => Promise<mongoose.Model<Category>>;
}

// Type check the category schema
((): Equals<keyof typeof Schema, keyof Category> => 1)();
