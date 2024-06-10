import { getMongodbConnection } from "../providers";
import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema(
  {
    description: {
      required: true,
      type: mongoose.Schema.Types.String
    },
    name: {
      required: true,
      type: mongoose.Schema.Types.String
    },
    pinned: {
      type: mongoose.Schema.Types.Boolean
    },
    tagline: {
      required: true,
      type: mongoose.Schema.Types.String
    }
  },
  { versionKey: false }
);

/**
 * Creates a category model.
 * @returns A category model.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
export async function getCategoryModel() {
  const connection = await getMongodbConnection();

  return connection.model("Category", CategorySchema);
}

export type CategoryModel = Awaited<ReturnType<typeof getCategoryModel>>;
