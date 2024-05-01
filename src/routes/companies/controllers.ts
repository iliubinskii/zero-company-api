import { CompaniesService, CompanyControllers } from "../../types";
import {
  assertDefined,
  buildErrorResponse,
  wrapAsyncHandler
} from "../../utils";
import { ErrorCode } from "../../schema";
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

      res.status(StatusCodes.CREATED).json(addedCompany);
    }),
    deleteCompany: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

      const affectedRows = await service.deleteCompany(id);

      res.status(StatusCodes.OK).send({ affectedRows });
    }),
    getCompanies: wrapAsyncHandler(async (req, res) => {
      const options = assertDefined(req.getCompaniesOptions);

      const companies = await service.getCompanies(options);

      res.json(companies);
    }),
    getCompany: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

      const company = await service.getCompany(id);

      if (company) res.json(company);
      else
        res
          .status(StatusCodes.NOT_FOUND)
          .json(buildErrorResponse(ErrorCode.CompanyNotFound));
    }),
    updateCompany: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

      const company = assertDefined(req.companyUpdate);

      const updatedCompany = await service.updateCompany(id, company);

      if (updatedCompany) res.status(StatusCodes.OK).json(updatedCompany);
      else
        res
          .status(StatusCodes.NOT_FOUND)
          .json(buildErrorResponse(ErrorCode.CompanyNotFound));
    })
  };
}
