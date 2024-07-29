import type { Article } from "../../schema";
import type { ArticlesService } from "../../types";
import type { FilterQuery } from "mongoose";
import { MAX_LIMIT } from "../../schema";
import { MONGODB_RUN_VALIDATORS } from "../../config";
import type { Writable } from "ts-toolbelt/out/Object/Writable";
import { getModels } from "../../schema-mongodb";

/**
 * Creates a MongoDB service for articles.
 * @returns A MongoDB service for articles.
 */
export function createArticlesService(): ArticlesService {
  return {
    addArticle: async data => {
      const { ArticleModel } = await getModels();

      const article = new ArticleModel(data);

      await article.save();

      return article;
    },
    deleteArticle: async id => {
      const { ArticleModel } = await getModels();

      const article = await ArticleModel.findByIdAndDelete(id);

      return article ? 1 : 0;
    },
    getArticle: async id => {
      const { ArticleModel } = await getModels();

      return ArticleModel.findById(id);
    },
    getArticles: async ({
      limit = MAX_LIMIT,
      offset = 0
      // eslint-disable-next-line no-warning-comments -- Assigned
      // TODO: Add filter to select articles or blogs
    } = {}) => {
      const filter: Writable<FilterQuery<Article>> = {};

      const { ArticleModel } = await getModels();

      const [articles, total] = await Promise.all([
        ArticleModel.find(filter).skip(offset).limit(limit),
        ArticleModel.countDocuments(filter)
      ]);

      return {
        count: articles.length,
        docs: articles,
        total
      };
    },
    updateArticle: async (id, article) => {
      const { ArticleModel } = await getModels();

      return ArticleModel.findByIdAndUpdate(id, article, {
        new: true,
        runValidators: MONGODB_RUN_VALIDATORS
      });
    }
  };
}
