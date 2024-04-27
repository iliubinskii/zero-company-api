import {
  CompanyUpdateValidationSchema,
  CompanyValidationSchema,
  GetCompaniesOptionsValidationSchema
} from "./validation-schema";
import {
  FieldType,
  createUploadHandler,
  createWebAccessibleStorage
} from "../global-middleware";
import { CompaniesMiddleware } from "../types";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { filterUndefinedProperties } from "../utils";
import { lang } from "../langs";

export const companiesMiddleware: CompaniesMiddleware = {
  requireValidCompany: (req, res, next) => {
    try {
      req.customCompany = CompanyValidationSchema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError)
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: lang.InvalidCompanyData, errors: err.errors });
      else throw err;
    }
  },
  requireValidCompanyUpdate: (req, res, next) => {
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
  },
  requireValidGetCompaniesOptions: (req, res, next) => {
    try {
      req.getCompaniesOptions = filterUndefinedProperties(
        GetCompaniesOptionsValidationSchema.parse(req.query)
      );
      next();
    } catch (err) {
      if (err instanceof ZodError)
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: lang.InvalidQuery, errors: err.errors });
      else throw err;
    }
  },
  uploadHandler: createUploadHandler({
    header: 1,
    images: 10,
    logo: 1
  }),
  webAccessibleStorage: createWebAccessibleStorage({
    header: FieldType.single,
    images: FieldType.multiple,
    logo: FieldType.single
  })
};
