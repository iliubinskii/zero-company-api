import { requireIdParam, requireJwtAdmin } from "../../middleware";
import type { CategoryControllers } from "../../types";
import { Router } from "express";

/**
 * Creates a router for category routes.
 * @param controllers - The controllers for the category routes.
 * @returns A router for category routes.
 */
export function createCategoriesRouter(
  controllers: CategoryControllers
): Router {
  const router = Router();

  router
    .get("/", controllers.getCategories)
    .post("/", requireJwtAdmin, controllers.addCategory)
    .get("/:id", requireIdParam, controllers.getCategory)
    .put("/:id", requireJwtAdmin, requireIdParam, controllers.updateCategory)
    .delete("/:id", requireJwtAdmin, requireIdParam, controllers.deleteCategory)
    .get("/:id/companies", requireIdParam, controllers.getCompaniesByCategory);

  return router;
}
