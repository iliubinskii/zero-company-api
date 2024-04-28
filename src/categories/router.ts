import { CategoryControllers } from "../types";
import { categoriesMiddleware } from "./middleware";
import express, { Router } from "express";
import { requireValidMongodbId } from "../global-middleware";

/**
 * Creates a router for category routes.
 * @param controllers - The controllers for the category routes.
 * @returns A router for category routes.
 */
export function createCategoriesRouter(
  controllers: CategoryControllers
): Router {
  const {
    requireValidCategory,
    requireValidCategoryUpdate,
    requireValidGetCategoriesOptions,
    requireValidGetCompaniesByCategoryOptions
  } = categoriesMiddleware;

  const router = express.Router();

  router
    .get("/", requireValidGetCategoriesOptions, controllers.getCategories)
    .post("/", requireValidCategory, controllers.addCategory)
    .get("/:id", requireValidMongodbId("id"), controllers.getCategory)
    .put(
      "/:id",
      requireValidMongodbId("id"),
      requireValidCategoryUpdate,
      controllers.updateCategory
    )
    .delete("/:id", requireValidMongodbId("id"), controllers.deleteCategory)
    .get(
      "/:id/companies",
      requireValidMongodbId("id"),
      requireValidGetCompaniesByCategoryOptions,
      controllers.getCompaniesByCategory
    );

  return router;
}
