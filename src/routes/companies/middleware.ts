import {
  CompanyCreateValidationSchema,
  CompanyUpdateValidationSchema,
  ErrorCode,
  GetCompaniesOptionsValidationSchema,
  RoutesOld
} from "../../schema";
import {
  FieldType,
  parseFormData,
  webAccessibleStorage
} from "../../middleware";
import {
  buildErrorResponse,
  filterUndefinedProperties,
  sendResponseOld
} from "../../utils";
import { CompaniesMiddleware } from "../../types";
import { StatusCodes } from "http-status-codes";
import zod from "zod";

export const companiesMiddleware: CompaniesMiddleware = {
  parseFormData: parseFormData({
    images: 10,
    logo: 1
  }),
  requireValidCompanyCreate: (req, res, next) => {
    try {
      req.companyCreate = filterUndefinedProperties(
        CompanyCreateValidationSchema.parse(req.body)
      );
      next();
    } catch (err) {
      if (err instanceof zod.ZodError)
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidCompanyData"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidCompanyData, err.errors)
        );
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
      if (err instanceof zod.ZodError)
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidCompanyData"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidCompanyData, err.errors)
        );
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
      if (err instanceof zod.ZodError)
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidQuery"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, err.errors)
        );
      else throw err;
    }
  },
  webAccessibleStorage: webAccessibleStorage({
    images: FieldType.multiple,
    logo: FieldType.single
  })
};
