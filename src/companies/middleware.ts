import {
  CompanyUpdateValidationSchema,
  CompanyValidationSchema,
  GetCompaniesOptionsValidationSchema
} from "./validation-schema";
import {
  FieldType,
  createFormDataParser,
  createWebAccessibleStorage
} from "../global-middleware";
import { buildErrorResponse, filterUndefinedProperties } from "../utils";
import { CompaniesMiddleware } from "../types";
import { ErrorCode } from "../schema";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const companiesMiddleware: CompaniesMiddleware = {
  parseFormData: createFormDataParser({
    images: 10,
    logo: 1
  }),
  requireValidCompany: (req, res, next) => {
    try {
      req.company = {
        foundedAt: new Date().toISOString(),
        recommended: false,
        ...CompanyValidationSchema.parse(req.body)
      };
      next();
    } catch (err) {
      if (err instanceof ZodError)
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(buildErrorResponse(ErrorCode.InvalidCompanyData, err.errors));
      else throw err;
    }
  },
  requireValidCompanyUpdate: (req, res, next) => {
    try {
      req.companyUpdate = filterUndefinedProperties(
        CompanyUpdateValidationSchema.parse(req.body)
      );
      next();
    } catch (err) {
      if (err instanceof ZodError)
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(buildErrorResponse(ErrorCode.InvalidCompanyData, err.errors));
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
          .json(buildErrorResponse(ErrorCode.InvalidQuery, err.errors));
      else throw err;
    }
  },
  webAccessibleStorage: createWebAccessibleStorage({
    images: FieldType.multiple,
    logo: FieldType.single
  })
};
