import { CompaniesService, CompanyControllers } from "../../types";
import {
  CompanyCreateValidationSchema,
  CompanyUpdateValidationSchema,
  ErrorCode,
  GetCompaniesOptionsValidationSchema,
  Routes,
  RoutesOld
} from "../../schema";
import {
  assertDefined,
  buildErrorResponse,
  filterUndefinedProperties,
  sendResponse,
  sendResponseOld,
  wrapAsyncHandler
} from "../../utils";
import { StatusCodes } from "http-status-codes";

/**
 * Creates company controllers.
 * @param service - The companies service.
 * @returns The company controllers.
 */
export function createCompanyControllers(
  service: CompaniesService
): CompanyControllers {
  return {
    addCompany: wrapAsyncHandler(async (req, res) => {
      const company = CompanyCreateValidationSchema.safeParse(req.body);

      if (company.success) {
        const addedCompany = await service.addCompany(
          filterUndefinedProperties({
            ...company.data,
            foundedAt: new Date().toISOString()
          })
        );

        // eslint-disable-next-line no-warning-comments -- Assigned to Alex
        // TODO: Replace all sendResponseOld and RoutesOld with sendResponse and Routes
        // Use "npm run parse-openapi" to convert the OpenAPI schema to TypeScript interfaces
        sendResponseOld<RoutesOld["/companies"]["/"]["POST"]>(
          res,
          StatusCodes.CREATED,
          addedCompany
        );
      } else
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidCompanyData"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidCompanyData, company.error)
        );
    }),
    deleteCompany: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const affectedRows = await service.deleteCompany(id);

      sendResponseOld<RoutesOld["/companies"]["/:id"]["DELETE"]>(
        res,
        StatusCodes.OK,
        { affectedRows }
      );
    }),
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
    getCompany: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const company = await service.getCompany(id);

      if (company)
        // eslint-disable-next-line no-warning-comments -- Assigned to Alex
        // TODO: Use this as a sample
        sendResponse<Routes["/companies/{id}"]["get"]>(
          res,
          StatusCodes.OK,
          company
        );
      else
        sendResponse<Routes["/companies/{id}"]["get"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.CompanyNotFound)
        );
    }),
    updateCompany: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const company = CompanyUpdateValidationSchema.safeParse(req.body);

      if (company.success) {
        const updatedCompany = await service.updateCompany(
          id,
          filterUndefinedProperties(company.data)
        );

        if (updatedCompany)
          sendResponseOld<RoutesOld["/companies"]["/:id"]["PUT"]["OK"]>(
            res,
            StatusCodes.OK,
            updatedCompany
          );
        else
          sendResponseOld<RoutesOld["/companies"]["/:id"]["PUT"]["NOT_FOUND"]>(
            res,
            StatusCodes.NOT_FOUND,
            buildErrorResponse(ErrorCode.CompanyNotFound)
          );
      } else
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidCompanyData"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidCompanyData, company.error)
        );
    })
  };
}
