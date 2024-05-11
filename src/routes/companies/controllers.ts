import { CompaniesService, CompanyControllers } from "../../types";
import { ErrorCode, RoutesOld } from "../../schema";
import {
  assertDefined,
  buildErrorResponse,
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
      const company = assertDefined(req.companyCreate);

      const addedCompany = await service.addCompany(company);

      sendResponseOld<RoutesOld["/companies"]["/"]["POST"]>(
        res,
        StatusCodes.CREATED,
        addedCompany
      );
    }),
    deleteCompany: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

      const affectedRows = await service.deleteCompany(id);

      sendResponseOld<RoutesOld["/companies"]["/:id"]["DELETE"]>(
        res,
        StatusCodes.OK,
        { affectedRows }
      );
    }),
    getCompanies: wrapAsyncHandler(async (req, res) => {
      const options = assertDefined(req.getCompaniesOptions);

      const companies = await service.getCompanies(options);

      sendResponseOld<RoutesOld["/companies"]["/"]["GET"]>(
        res,
        StatusCodes.OK,
        companies
      );
    }),
    getCompany: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

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
      const id = assertDefined(req.params["id"]);

      const company = assertDefined(req.companyUpdate);

      const updatedCompany = await service.updateCompany(id, company);

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
    })
  };
}
