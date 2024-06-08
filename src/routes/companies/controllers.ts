import type { CompaniesService, CompanyControllers } from "../../types";
import {
  CompanyCreateValidationSchema,
  CompanyStatus,
  CompanyUpdateValidationSchema,
  ErrorCode,
  GetCompaniesOptionsValidationSchema
} from "../../schema";
import {
  assertDefined,
  assertValidForJsonStringify,
  buildErrorResponse,
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
      safeParse: (item, _params, req) => {
        const { email } = assertDefined(assertDefined(req).jwt);

        const result = CompanyCreateValidationSchema.safeParse(item);

        if (result.success)
          return {
            data: {
              ...result.data,
              createdAt: new Date(),
              founders: [{ email }],
              images: [],
              status: CompanyStatus.draft
            },
            success: true
          };

        return result;
      }
    },
    CompanyUpdateValidationSchema
  );

  return {
    addCompany: crudControllers.addItem,
    deleteCompany: crudControllers.deleteItem,
    getCompanies: wrapAsyncHandler(async (req, res) => {
      const options = GetCompaniesOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const companies = await service.getCompanies(options.data);

        sendResponse<Routes["/companies"]["get"]>(
          res,
          StatusCodes.OK,
          assertValidForJsonStringify(companies)
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
