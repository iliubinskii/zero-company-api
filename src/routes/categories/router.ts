import { requireIdParam, requireJwtAdmin } from "../../middleware";
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
    .get("/:id", requireIdParam, controllers.getCategory)
    .put(
      "/:id",
      requireJwtAdmin,
      requireIdParam,
      requireValidCategoryUpdate,
      controllers.updateCategory
    )
    .delete("/:id", requireJwtAdmin, requireIdParam, controllers.deleteCategory)
    .get(
      "/:id/companies",
      requireIdParam,
      requireValidGetCompaniesByCategoryOptions,
      controllers.getCompaniesByCategory
    );

  return router;
}
