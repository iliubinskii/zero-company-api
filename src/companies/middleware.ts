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
import { buildErrorResponse, filterUndefinedProperties } from "../utils";
import { CompaniesMiddleware } from "../types";
import { ErrorCode } from "../schema";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const companiesMiddleware: CompaniesMiddleware = {
  requireValidCompany: (req, res, next) => {
    try {
      req.company = filterUndefinedProperties({
        foundedAt: new Date().toISOString(),
        recommended: false,
        ...CompanyValidationSchema.parse(req.body)
      });
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
