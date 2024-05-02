import {
  CompanyCreateValidationSchema,
  CompanyUpdateValidationSchema,
  GetCompaniesOptionsValidationSchema
} from "./validation-schema";
import { ErrorCode, Routes } from "../../schema";
import {
  FieldType,
  parseFormData,
  webAccessibleStorage
} from "../../middleware";
import {
  buildErrorResponse,
  filterUndefinedProperties,
  sendResponse
} from "../../utils";
import { CompaniesMiddleware } from "../../types";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const companiesMiddleware: CompaniesMiddleware = {
  parseFormData: parseFormData({
    images: 10,
    logo: 1
  }),
  requireValidCompany: (req, res, next) => {
    try {
      req.companyCreate = CompanyCreateValidationSchema.parse(req.body);

      if (req.companyCreate.founders.some(founder => founder.confirmed))
        sendResponse<Routes["*"]["CONFLICT"]["InvalidFounderConfirmedStatus"]>(
          res,
          StatusCodes.CONFLICT,
          buildErrorResponse(ErrorCode.InvalidFounderConfirmedStatus)
        );
      else next();
    } catch (err) {
      if (err instanceof ZodError)
        sendResponse<Routes["*"]["BAD_REQUEST"]["InvalidCompanyData"]>(
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
      if (err instanceof ZodError)
        sendResponse<Routes["*"]["BAD_REQUEST"]["InvalidCompanyData"]>(
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
      if (err instanceof ZodError)
        sendResponse<Routes["*"]["BAD_REQUEST"]["InvalidQuery"]>(
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
