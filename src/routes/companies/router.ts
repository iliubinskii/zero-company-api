import {
  nullifyEmptyStrings,
  parseNestedFormData,
  requireJwtAdmin,
  requireJwtUser,
  requireValidMongodbId
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
    requireValidCompany,
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
      requireValidCompany,
      controllers.addCompany
    )
    .get("/:id", requireValidMongodbId("id"), controllers.getCompany)
    .put(
      "/:id",
      requireJwtAdmin,
      requireValidMongodbId("id"),
      parseFormData,
      nullifyEmptyStrings,
      webAccessibleStorage,
      parseNestedFormData,
      requireValidCompanyUpdate,
      controllers.updateCompany
    )
    .delete(
      "/:id",
      requireJwtAdmin,
      requireValidMongodbId("id"),
      controllers.deleteCompany
    );

  return router;
}
