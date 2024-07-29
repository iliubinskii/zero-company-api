import { getArticleModel } from "./articles";
import { getCategoryModel } from "./categories";
import { getCompanyModel } from "./companies";
import { getDocumentModel } from "./documents";
import { getMongodbConnection } from "../providers";
import { getUserModel } from "./users";

// Cache the models in serverless environments
let cachedModels: Models | undefined;

/**
 * Gets the models.
 * @returns The models.
 */
export async function getModels(): Promise<Models> {
  if (cachedModels) return cachedModels;

  const connection = await getMongodbConnection();

  cachedModels = {
    ArticleModel: getArticleModel(connection),
    CategoryModel: getCategoryModel(connection),
    CompanyModel: getCompanyModel(connection),
    DocumentModel: getDocumentModel(connection),
    UserModel: getUserModel(connection)
  } as const;

  await connection.syncIndexes();

  return cachedModels;
}

/**
 * Check if models exist.
 * @returns Whether models exist.
 */
export function modelsExist(): boolean {
  return Boolean(cachedModels);
}

export interface Models {
  readonly ArticleModel: ReturnType<typeof getArticleModel>;
  readonly CategoryModel: ReturnType<typeof getCategoryModel>;
  readonly CompanyModel: ReturnType<typeof getCompanyModel>;
  readonly DocumentModel: ReturnType<typeof getDocumentModel>;
  readonly UserModel: ReturnType<typeof getUserModel>;
}
