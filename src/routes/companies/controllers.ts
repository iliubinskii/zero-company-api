import { CompaniesService, CompanyControllers } from "../../types";
import {
  CompanyCreateValidationSchema,
  CompanyUpdateValidationSchema,
  ErrorCode,
  GetCompaniesOptionsValidationSchema,
  RoutesOld
} from "../../schema";
import {
  assertDefined,
  buildErrorResponse,
  filterUndefinedProperties,
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

        sendResponseOld<RoutesOld["/companies"]["/"]["GET"]>(
          res,
          StatusCodes.OK,
          companies
        );
      } else
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidQuery"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    getCompany: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const company = await service.getCompany(id);

      if (company)
        sendResponseOld<RoutesOld["/companies"]["/:id"]["GET"]["OK"]>(
          res,
          StatusCodes.OK,
          company
        );
      else
        sendResponseOld<RoutesOld["/companies"]["/:id"]["GET"]["NOT_FOUND"]>(
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
