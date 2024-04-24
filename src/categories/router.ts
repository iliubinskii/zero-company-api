import { requireValidCategory, requireValidCategoryUpdate } from "./middleware";
import { CategoryControllers } from "../types";

import express, { Router } from "express";

/**
 * Creates a router for category routes.
 * @param controllers - The controllers for the category routes.
 * @returns A router for category routes.
 */
export function createCategoriesRouter(
  controllers: CategoryControllers
): Router {
  const router = express.Router();

  router
    .get("/", controllers.getCategories)
    .post("/", requireValidCategory, controllers.addCategory)
    .get("/:id", controllers.getCategory)
    .put("/:id", requireValidCategoryUpdate, controllers.updateCategory)
    .delete("/:id", controllers.deleteCategory);

  return router;
}
