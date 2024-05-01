import { CompaniesService, CompanyControllers } from "../../types";
import { assertDefined, buildErrorResponse } from "../../utils";
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
    addCompany: async (req, res, next) => {
      try {
        const company = assertDefined(req.companyCreate);

        const addedCompany = await service.addCompany(company);

        res.status(StatusCodes.CREATED).json(addedCompany);
      } catch (err) {
        next(err);
      }
    },
    deleteCompany: async (req, res, next) => {
      try {
        const id = assertDefined(req.params["id"]);

        const affectedRows = await service.deleteCompany(id);

        res.status(StatusCodes.OK).send({ affectedRows });
      } catch (err) {
        next(err);
      }
    },
    getCompanies: async (req, res, next) => {
      try {
        const options = assertDefined(req.getCompaniesOptions);

        const companies = await service.getCompanies(options);

        res.json(companies);
      } catch (err) {
        next(err);
      }
    },
    getCompany: async (req, res, next) => {
      try {
        const id = assertDefined(req.params["id"]);

        const company = await service.getCompany(id);

        if (company) res.json(company);
        else
          res
            .status(StatusCodes.NOT_FOUND)
            .json(buildErrorResponse(ErrorCode.CompanyNotFound));
      } catch (err) {
        next(err);
      }
    },
    updateCompany: async (req, res, next) => {
      try {
        const id = assertDefined(req.params["id"]);

        const company = assertDefined(req.companyUpdate);

        const updatedCompany = await service.updateCompany(id, company);

        if (updatedCompany) res.status(StatusCodes.OK).json(updatedCompany);
        else
          res
            .status(StatusCodes.NOT_FOUND)
            .json(buildErrorResponse(ErrorCode.CompanyNotFound));
      } catch (err) {
        next(err);
      }
    }
  };
}