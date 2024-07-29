import {
  FieldType,
  parseFormData,
  webAccessibleStorage
} from "../../middleware";
import type { ArticlesMiddleware } from "../../types";

// eslint-disable-next-line no-warning-comments -- Assigned
// TODO: There should be `image` field in the article interface
export const articlesMiddleware: ArticlesMiddleware = {
  parseFormData: parseFormData({
    image: 1
  }),
  webAccessibleStorage: webAccessibleStorage({
    image: FieldType.single
  })
};
