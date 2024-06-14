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

      const { email } = assertDefined(assertDefined(req).jwt);

      if (company.success) {
        const addedCompany = await service.addCompany({
          ...company.data,
          createdAt: new Date(),
          founders: [{ email }],
          images: [],
          status: CompanyStatus.draft
        });

        sendResponse<Routes["/companies"]["post"]>(
          res,
          StatusCodes.CREATED,
          assertValidForJsonStringify(addedCompany)
        );
      } else
        sendResponse<Routes["/companies"]["post"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, company.error)
        );
    }),
    deleteCompany: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const affectedRows = await service.deleteCompany(id);

      sendResponse<Routes["/companies/{id}"]["delete"]>(res, StatusCodes.OK, {
        affectedRows
      });
    }),
    generateFoundingAgreement: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const company = await service.generateFoundingAgreement(id);

      if (company)
        if (company === StatusCodes.CONFLICT)
          sendResponse<Routes["/companies/{id}/found"]["post"]>(
            res,
            StatusCodes.CONFLICT,
            buildErrorResponse(ErrorCode.AlreadyExists)
          );
        else
          sendResponse<Routes["/companies/{id}/found"]["post"]>(
            res,
            StatusCodes.OK,
            assertValidForJsonStringify(company)
          );
      else
        sendResponse<Routes["/companies/{id}/found"]["post"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.NotFound)
        );
    }),
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
    getCompany: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const company = await service.getCompany(id);

      if (company)
        sendResponse<Routes["/companies/{id}"]["get"]>(
          res,
          StatusCodes.OK,
          assertValidForJsonStringify(company)
        );
      else
        sendResponse<Routes["/companies/{id}"]["get"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.NotFound)
        );
    }),
    updateCompany: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const company = CompanyUpdateValidationSchema.safeParse(req.body);

      if (company.success) {
        const updatedCompany = await service.updateCompany(id, company.data);

        if (updatedCompany)
          sendResponse<Routes["/companies/{id}"]["put"]>(
            res,
            StatusCodes.OK,
            assertValidForJsonStringify(updatedCompany)
          );
        else
          sendResponse<Routes["/companies/{id}"]["put"]>(
            res,
            StatusCodes.NOT_FOUND,
            buildErrorResponse(ErrorCode.NotFound)
          );
      } else
        sendResponse<Routes["/companies/{id}"]["put"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, company.error)
        );
    })
  };
}
