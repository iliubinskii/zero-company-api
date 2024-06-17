import { requireIdParam, requireJwt } from "../../middleware";
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
  return Router()
    .get("/", requireJwt, controllers.getDocuments)
    .post("/", requireJwt, controllers.addDocument)
    .get("/:id", requireJwt, requireIdParam, controllers.getDocument)
    .put("/:id", requireJwt, requireIdParam, controllers.updateDocument)
    .delete("/:id", requireJwt, requireIdParam, controllers.deleteDocument);
}
