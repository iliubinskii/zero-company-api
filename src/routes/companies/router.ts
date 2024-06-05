import {
  createCompanyImageControllers,
  createCompanyImagesRouter,
  createCompanyImagesService
} from "./images";
import {
  nullifyEmptyStringsDeep,
  parseNestedFormData,
  requireIdParam,
  requireJwt,
  requireJwtAdmin,
  stripEmptyStringsDeep
} from "../../middleware";
import type { CompanyControllers } from "../../types";
import { Router } from "express";
import { companiesMiddleware } from "./middleware";
import { getCompanyModel } from "./model";

/**
 * Creates a router for company routes.
 * @param controllers - The controllers for the company routes.
 * @returns A router for company routes.
 */
export function createCompaniesRouter(controllers: CompanyControllers): Router {
  const { parseFormData, webAccessibleStorage } = companiesMiddleware;

  const router = Router();

  const imagesService = createCompanyImagesService(getCompanyModel);

  const imageControllers = createCompanyImageControllers(imagesService);

  const imagesRouter = createCompanyImagesRouter(imageControllers);

  router
    .get("/", controllers.getCompanies)
    .post(
      "/",
      requireJwt,
      parseFormData,
      stripEmptyStringsDeep,
      webAccessibleStorage,
      parseNestedFormData,
      controllers.addCompany
    )
    .get("/:id", requireIdParam, controllers.getCompany)
    .put(
      "/:id",
      requireJwtAdmin,
      requireIdParam,
      parseFormData,
      nullifyEmptyStringsDeep,
      webAccessibleStorage,
      parseNestedFormData,
      controllers.updateCompany
    )
    .delete("/:id", requireJwtAdmin, requireIdParam, controllers.deleteCompany)
    .use("/:id/images", requireJwtAdmin, requireIdParam, imagesRouter);

  return router;
}
