import { requireIdParam, requireJwtAdmin } from "../../middleware";
import type { DocumentControllers } from "../../types";
import { Router } from "express";

/**
 * Creates a router for document routes.
 * @param controllers - The controllers for the document routes.
 * @returns A router for document routes.
 */
export function createDocumentsRouter(
  controllers: DocumentControllers
): Router {
  const router = Router();

  router
    .get("/", requireJwtAdmin, controllers.getDocuments)
    .post("/", requireJwtAdmin, controllers.addDocument)
    .get("/:id", requireJwtAdmin, requireIdParam, controllers.getDocument)
    .put("/:id", requireJwtAdmin, requireIdParam, controllers.updateDocument)
    .delete(
      "/:id",
      requireJwtAdmin,
      requireIdParam,
      controllers.deleteDocument
    );

  return router;
}