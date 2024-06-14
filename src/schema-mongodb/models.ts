import { getCategoryModel } from "./categories";
import { getCompanyModel } from "./companies";
import { getDocumentModel } from "./documents";
import { getMongodbConnection } from "../providers";
import { getUserModel } from "./users";

/**
 * Gets the models.
 * @returns The models.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
export async function getModels() {
  const connection = await getMongodbConnection();

  return {
    CategoryModel: getCategoryModel(connection),
    CompanyModel: getCompanyModel(connection),
    DocumentModel: getDocumentModel(connection),
    UserModel: getUserModel(connection)
  } as const;
}
