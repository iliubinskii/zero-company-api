import type { CompanyImageControllers } from "../../../types";
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

  return Router()
    .post("/", parseFormData, webAccessibleStorage, controllers.addImage)
    .put(
      "/:assetId",
      parseFormData,
      webAccessibleStorage,
      controllers.updateImage
    )
    .delete("/:assetId", controllers.deleteImage);
}
