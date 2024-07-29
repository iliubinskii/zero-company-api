import type { ArticleCreate, ArticleUpdate, ExistingArticle } from "./articles";
import { IdValidationSchema } from "./common";
import zod from "zod";

export const ExistingArticleValidationSchema = zod.object({
  _id: IdValidationSchema
  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: Add validators
  // Use 'ImageValidationSchema` for the image field like in companies
});

export const ArticleCreateValidationSchema = ExistingArticleValidationSchema;

export const ArticleUpdateValidationSchema =
  ExistingArticleValidationSchema.partial();

// Type check the existing article validation schema
((): ExistingArticle | undefined => {
  const result = ExistingArticleValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the article create validation schema
((): ArticleCreate | undefined => {
  const result = ArticleCreateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();

// Type check the article update validation schema
((): ArticleUpdate | undefined => {
  const result = ArticleUpdateValidationSchema.safeParse(undefined);

  return result.success ? result.data : undefined;
})();
