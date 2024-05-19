import { CompanyImageControllers } from "../../../types";
import { Router } from "express";
import { companyImagesMiddleware } from "./middleware";

/**
 * Creates a router for company image routes.
 * @param controllers - The controllers for the company image routes.
 * @returns A router for company image routes.
 */
export function createCompanyImagesRouter(
  controllers: CompanyImageControllers
): Router {
  const { parseFormData, webAccessibleStorage } = companyImagesMiddleware;

  const router = Router();

  // eslint-disable-next-line no-warning-comments -- Assigned to David
  // TODO:
  // Add other middleware as needed
  // Write postman tests for these routes
  router
    .post("/", parseFormData, webAccessibleStorage, controllers.addImage)
    .put(
      "/:assetId",
      parseFormData,
      webAccessibleStorage,
      controllers.updateImage
    )
    .delete("/:assetId", controllers.deleteImage);

  return router;
}
