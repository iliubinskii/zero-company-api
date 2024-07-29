import type { MultipleDocsResponse, Update } from "./common";

// eslint-disable-next-line misc/typescript/no-empty-interfaces -- Temp
export interface Article {
  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: Add properties
  // Use `WebAccessibleImage` for the image field like in companies
}

export interface ArticleCreate extends Article {}

export interface ArticleUpdate extends Update<Article> {}

export interface ExistingArticle extends Article {
  readonly _id: string;
}

export type ExistingArticles = MultipleDocsResponse<ExistingArticle>;
