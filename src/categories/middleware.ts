import {
  CategoryUpdateValidationSchema,
  CategoryValidationSchema
} from "./validation-schema";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { filterUndefinedProperties } from "../utils";
import { t } from "i18next";

/**
 * Middleware to require a valid category object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export function requireValidCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.customCategory = CategoryValidationSchema.parse(req.body);
    next();
  } catch {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: t("InvalidCategoryData") });
  }
}

/**
 * Middleware to require a valid category update object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export function requireValidCategoryUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.customCategoryUpdate = filterUndefinedProperties(
      CategoryUpdateValidationSchema.parse(req.body)
    );
    next();
  } catch {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: t("InvalidCategoryData") });
  }
}
