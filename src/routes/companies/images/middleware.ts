import {
  FieldType,
  parseFormData,
  webAccessibleStorage
} from "../../../middleware";
import type { CompanyImagesMiddleware } from "../../../types";

export const companyImagesMiddleware: CompanyImagesMiddleware = {
  parseFormData: parseFormData({
    image: 1
  }),
  webAccessibleStorage: webAccessibleStorage({
    image: FieldType.single
  })
};
