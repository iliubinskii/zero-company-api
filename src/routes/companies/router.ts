import type { CompanyControllers, CompanyImageControllers } from "../../types";
import {
  nullifyEmptyStringsDeep,
  parseNestedFormData,
  requireIdParam,
  requireJwt,
  requireJwtAdmin,
  stripEmptyStringsDeep
} from "../../middleware";
import { Router } from "express";
import { companiesMiddleware } from "./middleware";
import { createCompanyImagesRouter } from "./images";

/**
 * Creates a router for company routes.
 * @param controllers - The controllers for the company routes.
 * @param imageControllers - The controllers for the company image routes.
 * @returns A router for company routes.
 */
export function createCompaniesRouter(
  controllers: CompanyControllers,
  imageControllers: CompanyImageControllers
): Router {
  const { parseFormData, webAccessibleStorage } = companiesMiddleware;

  return Router()
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
    .put(
      "/:id/found",
      requireJwt,
      requireIdParam,
      controllers.generateFoundingAgreement
    )
    .use(
      "/:id/images",
      requireJwtAdmin,
      requireIdParam,
      createCompanyImagesRouter(imageControllers)
    );
}
