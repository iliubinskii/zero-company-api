import type {
  Article,
  ArticleUpdate,
  ExistingArticle,
  GetArticlesOptions,
  MultipleDocsResponse
} from "../schema";
import type { RequestHandler } from "express";
import type mongoose from "mongoose";

export interface ArticleControllers {
  readonly addArticle: RequestHandler;
  readonly deleteArticle: RequestHandler;
  readonly getArticle: RequestHandler;
  readonly getArticles: RequestHandler;
  readonly updateArticle: RequestHandler;
}

export interface ArticlesMiddleware {
  readonly parseFormData: RequestHandler;
  readonly webAccessibleStorage: RequestHandler;
}

export interface ArticlesService {
  /**
   * Adds a article to the database.
   * @param article - The article to add.
   * @returns A promise that resolves when the article has been added.
   */
  readonly addArticle: (article: Article) => Promise<RawExistingArticle>;
  /**
   * Deletes a article from the database.
   * @param id - The ID of the article to delete.
   * @returns A promise that resolves with the number of affected rows.
   */
  readonly deleteArticle: (id: string) => Promise<number>;
  /**
   * Gets a article from the database.
   * @param id - The ID of the article to get.
   * @returns A promise that resolves with the article, or `null` if the article was not found.
   */
  readonly getArticle: (id: string) => Promise<RawExistingArticle | null>;
  /**
   * Gets all articles from the database.
   * @param options - The options to use when getting articles.
   * @returns A promise that resolves with all articles in the database.
   */
  readonly getArticles: (
    options?: GetArticlesOptions
  ) => Promise<RawExistingArticles>;
  /**
   * Updates a article in the database.
   * @param id - The ID of the article to update.
   * @param article - The article data to update.
   * @returns A promise that resolves with the updated article, or `null` if the article was not found.
   */
  readonly updateArticle: (
    id: string,
    article: ArticleUpdate
  ) => Promise<RawExistingArticle | null>;
}

export interface RawExistingArticle extends Omit<ExistingArticle, "_id"> {
  readonly _id: mongoose.Types.ObjectId;
}

export type RawExistingArticles = MultipleDocsResponse<RawExistingArticle>;
