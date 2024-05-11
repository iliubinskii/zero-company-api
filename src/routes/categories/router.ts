import { requireJwtAdmin, requireValidMongodbId } from "../../middleware";
import { CategoryControllers } from "../../types";
import { Router } from "express";
import { categoriesMiddleware } from "./middleware";

/**
 * Creates a router for category routes.
 * @param controllers - The controllers for the category routes.
 * @returns A router for category routes.
 */
export function createCategoriesRouter(
  controllers: CategoryControllers
): Router {
  const {
    requireValidCategoryCreate,
    requireValidCategoryUpdate,
    requireValidGetCategoriesOptions,
    requireValidGetCompaniesByCategoryOptions
  } = categoriesMiddleware;

  const router = Router();

  router
    .get("/", requireValidGetCategoriesOptions, controllers.getCategories)
    .post(
      "/",
      requireJwtAdmin,
      requireValidCategoryCreate,
      controllers.addCategory
    )
    .get("/:id", requireValidMongodbId("id"), controllers.getCategory)
    .put(
      "/:id",
      requireJwtAdmin,
      requireValidMongodbId("id"),
      requireValidCategoryUpdate,
      controllers.updateCategory
    )
    .delete(
      "/:id",
      requireJwtAdmin,
      requireValidMongodbId("id"),
      controllers.deleteCategory
    )
    .get(
      "/:id/companies",
      requireValidMongodbId("id"),
      requireValidGetCompaniesByCategoryOptions,
      controllers.getCompaniesByCategory
    );

  return router;
}
