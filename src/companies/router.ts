import { CompanyControllers } from "../types";
import { companiesMiddleware } from "./middleware";
import express, { Router } from "express";
import { requireValidMongodbId } from "../global-middleware";

/**
 * Creates a router for company routes.
 * @param controllers - The controllers for the company routes.
 * @returns A router for company routes.
 */
export function createCompaniesRouter(controllers: CompanyControllers): Router {
  const {
    requireValidCompany,
    requireValidCompanyUpdate,
    requireValidGetCompaniesOptions,
    uploadHandler,
    webAccessibleStorage
  } = companiesMiddleware;

  const router = express.Router();

  router
    .get("/", requireValidGetCompaniesOptions, controllers.getCompanies)
    .post(
      "/",
      uploadHandler,
      webAccessibleStorage,
      requireValidCompany,
      controllers.addCompany
    )
    .get("/:id", requireValidMongodbId("id"), controllers.getCompany)
    .put(
      "/:id",
      uploadHandler,
      webAccessibleStorage,
      requireValidMongodbId("id"),
      requireValidCompanyUpdate,
      controllers.updateCompany
    )
    .delete("/:id", requireValidMongodbId("id"), controllers.deleteCompany);

  return router;
}
