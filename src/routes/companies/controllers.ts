import {
  COMPANY_STATUS,
  CompanyCreateValidationSchema,
  CompanyUpdateValidationSchema,
  ErrorCode,
  GetCompaniesOptionsValidationSchema
} from "../../schema";
import type { CompaniesService, CompanyControllers } from "../../types";
import {
  buildErrorResponse,
  filterUndefinedProperties,
  sendResponse,
  wrapAsyncHandler
} from "../../utils";
import type { Routes } from "../../schema";
import { StatusCodes } from "http-status-codes";
import { createCrudControllers } from "../../services";

/**
 * Creates company controllers.
 * @param service - The companies service.
 * @returns The company controllers.
 */
export function createCompanyControllers(
  service: CompaniesService
): CompanyControllers {
  const { crudService } = service;

  const crudControllers = createCrudControllers(
    crudService,
    {
      safeParse: item => {
        const result = CompanyCreateValidationSchema.safeParse(item);

        if (result.success)
          return {
            data: filterUndefinedProperties({
              ...result.data,
              founders: [],
              images: [],
              status: COMPANY_STATUS.draft
            }),
            success: true
          };

        return result;
      }
    },
    {
      safeParse: item => {
        const result = CompanyUpdateValidationSchema.safeParse(item);

        if (result.success)
          return {
            data: filterUndefinedProperties(result.data),
            success: true
          };

        return result;
      }
    }
  );

  return {
    addCompany: crudControllers.addItem,
    deleteCompany: crudControllers.deleteItem,
    getCompanies: wrapAsyncHandler(async (req, res) => {
      const options = GetCompaniesOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const companies = await service.getCompanies(
          filterUndefinedProperties(options.data)
        );

        sendResponse<Routes["/companies"]["get"]>(
          res,
          StatusCodes.OK,
          companies
        );
      } else
        sendResponse<Routes["/companies"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    getCompany: crudControllers.getItem,
    updateCompany: crudControllers.updateItem
  };
}
