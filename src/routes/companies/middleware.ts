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

export const companiesMiddleware: CompaniesMiddleware = {
  parseFormData: parseFormData({
    images: 10,
    logo: 1
  }),
  requireValidCompanyCreate: (req, res, next) => {
    const companyCreate = CompanyCreateValidationSchema.safeParse(req.body);

    if (companyCreate.success) {
      req.companyCreate = filterUndefinedProperties(companyCreate.data);
      next();
    } else
      sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidCompanyData"]>(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(
          ErrorCode.InvalidCompanyData,
          companyCreate.error.errors
        )
      );
  },
  requireValidCompanyUpdate: (req, res, next) => {
    const companyUpdate = CompanyUpdateValidationSchema.safeParse(req.body);

    if (companyUpdate.success) {
      req.companyUpdate = filterUndefinedProperties(companyUpdate.data);
      next();
    } else
      sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidCompanyData"]>(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(
          ErrorCode.InvalidCompanyData,
          companyUpdate.error.errors
        )
      );
  },
  requireValidGetCompaniesOptions: (req, res, next) => {
    const getCompaniesOptions = GetCompaniesOptionsValidationSchema.safeParse(
      req.query
    );

    if (getCompaniesOptions.success) {
      req.getCompaniesOptions = filterUndefinedProperties(
        getCompaniesOptions.data
      );
      next();
    } else
      sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidQuery"]>(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(
          ErrorCode.InvalidQuery,
          getCompaniesOptions.error.errors
        )
      );
  },
  webAccessibleStorage: webAccessibleStorage({
    images: FieldType.multiple,
    logo: FieldType.single
  })
};
