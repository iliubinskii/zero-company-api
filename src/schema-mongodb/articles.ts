import mongoose from "mongoose";

export const ArticleSchema = new mongoose.Schema(
  {
    // eslint-disable-next-line no-warning-comments -- Assigned
    // TODO: Adds `title` field in other applicable places
    title: {
      required: true,
      type: mongoose.Schema.Types.String
    }
    // eslint-disable-next-line no-warning-comments -- Assigned
    // TODO: Add the schema for the article
    // Use `webAccessibleImage` for the image field like in companies
  },
  { versionKey: false }
);

/**
 * Creates a article model.
 * @param connection - The mongoose connection.
 * @returns A article model.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
export function getArticleModel(connection: typeof mongoose) {
  return connection.model("Article", ArticleSchema);
}

export type ArticleModel = ReturnType<typeof getArticleModel>;
