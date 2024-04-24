import {
  requireValidCompany,
  requireValidCompanyUpdate,
  uploadHandler,
  webAccessibleStorage
} from "./middleware";
import { CompanyControllers } from "../schema";
import express, { Router } from "express";

/**
 * Creates a router for company routes.
 * @param controllers - The controllers for the company routes.
 * @returns A router for company routes.
 */
export function createCompaniesRouter(controllers: CompanyControllers): Router {
  const router = express.Router();

  router
    .get("/", controllers.getCompanies)
    .post(
      "/",
      uploadHandler,
      webAccessibleStorage,
      requireValidCompany,
      controllers.addCompany
    )
    .get("/:id", controllers.getCompany)
    .put(
      "/:id",
      uploadHandler,
      webAccessibleStorage,
      requireValidCompanyUpdate,
      controllers.updateCompany
    )
    .delete("/:id", controllers.deleteCompany);

  return router;
}
