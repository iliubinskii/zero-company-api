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
  buildErrorResponse,
  dangerouslyAssumeJsonTransform,
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
      const parsed = CompanyCreateValidationSchema.safeParse(req.body);

      const { email } = assertDefined(assertDefined(req).jwt);

      if (parsed.success) {
        const company = await service.addCompany({
          ...parsed.data,
          createdAt: new Date(),
          founders: [{ email }],
          images: [],
          status: CompanyStatus.draft
        });

        sendResponse<Routes["/companies"]["post"]>(
          res,
          StatusCodes.CREATED,
          dangerouslyAssumeJsonTransform(company)
        );
      } else
        sendResponse<Routes["/companies"]["post"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, parsed.error)
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
            dangerouslyAssumeJsonTransform(company)
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
          dangerouslyAssumeJsonTransform(companies)
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
          dangerouslyAssumeJsonTransform(company)
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

      const parsed = CompanyUpdateValidationSchema.safeParse(req.body);

      if (parsed.success) {
        const company = await service.updateCompany(id, parsed.data);

        if (company)
          sendResponse<Routes["/companies/{id}"]["put"]>(
            res,
            StatusCodes.OK,
            dangerouslyAssumeJsonTransform(company)
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
          buildErrorResponse(ErrorCode.InvalidData, parsed.error)
        );
    })
  };
}
