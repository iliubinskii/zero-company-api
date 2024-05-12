import {
  FieldType,
  parseFormData,
  webAccessibleStorage
} from "../../middleware";
import { CompaniesMiddleware } from "../../types";

export const companiesMiddleware: CompaniesMiddleware = {
  parseFormData: parseFormData({
    images: 10,
    logo: 1
  }),
  webAccessibleStorage: webAccessibleStorage({
    images: FieldType.multiple,
    logo: FieldType.single
  })
};
