import { requireIdParam, requireJwtAdmin } from "../../middleware";
import type { ArticleControllers } from "../../types";
import { Router } from "express";
import { articlesMiddleware } from "./middleware";

/**
 * Creates a router for article routes.
 * @param controllers - The controllers for the article routes.
 * @returns A router for article routes.
 */
export function createArticlesRouter(controllers: ArticleControllers): Router {
  const { parseFormData, webAccessibleStorage } = articlesMiddleware;

  return (
    Router()
      .get("/", controllers.getArticles)
      .post(
        "/",
        requireJwtAdmin,
        // Save the image to temp file
        parseFormData,
        // Uploads the image to Cloudinary
        webAccessibleStorage,
        controllers.addArticle
      )
      .get("/:id", requireIdParam, controllers.getArticle)
      // eslint-disable-next-line no-warning-comments -- Ok
      /*
      TODO:
      Use middleware like in the companies router to parse form data and handle web accessible storage:
      parseFormData
      webAccessibleStorage
      */
      .put("/:id", requireJwtAdmin, requireIdParam, controllers.updateArticle)
      .delete(
        "/:id",
        requireJwtAdmin,
        requireIdParam,
        controllers.deleteArticle
      )
  );
}
