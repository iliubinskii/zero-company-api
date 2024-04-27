import {
  CompanyUpdateValidationSchema,
  CompanyValidationSchema
} from "./validation-schema";
import {
  FieldType,
  createUploadHandler,
  createWebAccessibleStorage
} from "../global-middleware";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { filterUndefinedProperties } from "../utils";
import { lang } from "../langs";

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
  } catch (err) {
    if (err instanceof ZodError)
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: lang.InvalidCompanyData, errorData: err.errors });
    else throw err;
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
  } catch (err) {
    if (err instanceof ZodError)
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: lang.InvalidCompanyData, errors: err.errors });
    else throw err;
  }
}

export const uploadHandler = createUploadHandler({
  header: 1,
  images: 10,
  logo: 1
});

export const webAccessibleStorage = createWebAccessibleStorage({
  header: FieldType.single,
  images: FieldType.multiple,
  logo: FieldType.single
});
