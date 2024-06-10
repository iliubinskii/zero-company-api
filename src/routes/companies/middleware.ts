import {
  FieldType,
  parseFormData,
  webAccessibleStorage
} from "../../middleware";
import type { CompaniesMiddleware } from "../../types";

export const companiesMiddleware: CompaniesMiddleware = {
  parseFormData: parseFormData({
    addImages: 10,
    logo: 1
  }),
  webAccessibleStorage: webAccessibleStorage({
    addImages: FieldType.multiple,
    logo: FieldType.single
  })
};
