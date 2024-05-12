import {
  nullifyEmptyStrings,
  parseNestedFormData,
  requireIdParam,
  requireJwtAdmin,
  requireJwtUser
} from "../../middleware";
import { CompanyControllers } from "../../types";
import { Router } from "express";
import { companiesMiddleware } from "./middleware";

/**
 * Creates a router for company routes.
 * @param controllers - The controllers for the company routes.
 * @returns A router for company routes.
 */
export function createCompaniesRouter(controllers: CompanyControllers): Router {
  const {
    parseFormData,
    requireValidCompanyCreate,
    requireValidCompanyUpdate,
    requireValidGetCompaniesOptions,
    webAccessibleStorage
  } = companiesMiddleware;

  const router = Router();

  router
    .get("/", requireValidGetCompaniesOptions, controllers.getCompanies)
    .post(
      "/",
      requireJwtUser,
      parseFormData,
      nullifyEmptyStrings,
      webAccessibleStorage,
      parseNestedFormData,
      requireValidCompanyCreate,
      controllers.addCompany
    )
    .get("/:id", requireIdParam, controllers.getCompany)
    .put(
      "/:id",
      requireJwtAdmin,
      requireIdParam,
      parseFormData,
      nullifyEmptyStrings,
      webAccessibleStorage,
      parseNestedFormData,
      requireValidCompanyUpdate,
      controllers.updateCompany
    )
    .delete("/:id", requireJwtAdmin, requireIdParam, controllers.deleteCompany);

  return router;
}
