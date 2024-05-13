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
  const { parseFormData, webAccessibleStorage } = companiesMiddleware;

  const router = Router();

  // eslint-disable-next-line no-warning-comments -- Assigned to Alex
  // TODO: Take paths for OpenAPI here
  router
    .get("/", controllers.getCompanies)
    .post(
      "/",
      requireJwtUser,
      parseFormData,
      nullifyEmptyStrings,
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
      nullifyEmptyStrings,
      webAccessibleStorage,
      parseNestedFormData,
      controllers.updateCompany
    )
    .delete("/:id", requireJwtAdmin, requireIdParam, controllers.deleteCompany);

  return router;
}
