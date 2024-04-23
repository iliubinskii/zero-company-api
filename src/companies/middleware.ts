import {
  CompanyUpdateValidationSchema,
  CompanyValidationSchema
} from "./validation-schema";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { filterUndefinedProperties } from "../utils";
import { t } from "i18next";

/**
 * Middleware to require a valid company object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export function requireValidCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.customCompany = CompanyValidationSchema.parse(req.body);
    next();
  } catch {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: t("InvalidCompanyData") });
  }
}

/**
 * Middleware to require a valid company update object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export function requireValidCompanyUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.customCompanyUpdate = filterUndefinedProperties(
      CompanyUpdateValidationSchema.parse(req.body)
    );
    next();
  } catch {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: t("InvalidCompanyData") });
  }
}
