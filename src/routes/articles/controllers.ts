import type { ArticleControllers, ArticlesService } from "../../types";
import {
  ArticleCreateValidationSchema,
  ArticleUpdateValidationSchema,
  ErrorCode,
  GetArticlesOptionsValidationSchema
} from "../../schema";
import {
  assertDefined,
  buildErrorResponse,
  dangerouslyAssumeJsonTransform,
  sendResponse,
  wrapAsyncHandler
} from "../../utils";
import type { Routes } from "../../schema";
import { StatusCodes } from "http-status-codes";

/**
 * Creates article controllers.
 * @param service - The articles service.
 * @returns The article controllers.
 */
export function createArticleControllers(
  service: ArticlesService
): ArticleControllers {
  return {
    addArticle: wrapAsyncHandler(async (req, res) => {
      const parsed = ArticleCreateValidationSchema.safeParse(req.body);

      if (parsed.success) {
        const article = await service.addArticle(parsed.data);

        sendResponse<Routes["/articles"]["post"]>(
          res,
          StatusCodes.CREATED,
          dangerouslyAssumeJsonTransform(article)
        );
      } else
        sendResponse<Routes["/articles"]["post"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, parsed.error)
        );
    }),
    deleteArticle: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const affectedRows = await service.deleteArticle(id);

      sendResponse<Routes["/articles/{id}"]["delete"]>(res, StatusCodes.OK, {
        affectedRows
      });
    }),
    getArticle: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const article = await service.getArticle(id);

      if (article)
        sendResponse<Routes["/articles/{id}"]["get"]>(
          res,
          StatusCodes.OK,
          dangerouslyAssumeJsonTransform(article)
        );
      else
        sendResponse<Routes["/articles/{id}"]["get"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.NotFound)
        );
    }),
    getArticles: wrapAsyncHandler(async (req, res) => {
      const options = GetArticlesOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const articles = await service.getArticles(options.data);

        sendResponse<Routes["/articles"]["get"]>(
          res,
          StatusCodes.OK,
          dangerouslyAssumeJsonTransform(articles)
        );
      } else
        sendResponse<Routes["/articles"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    updateArticle: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const parsed = ArticleUpdateValidationSchema.safeParse(req.body);

      if (parsed.success) {
        const article = await service.updateArticle(id, parsed.data);

        if (article)
          sendResponse<Routes["/articles/{id}"]["put"]>(
            res,
            StatusCodes.OK,
            dangerouslyAssumeJsonTransform(article)
          );
        else
          sendResponse<Routes["/articles/{id}"]["put"]>(
            res,
            StatusCodes.NOT_FOUND,
            buildErrorResponse(ErrorCode.NotFound)
          );
      } else
        sendResponse<Routes["/articles/{id}"]["put"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, parsed.error)
        );
    })
  };
}
