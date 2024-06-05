import type {
  CompanyImageControllers,
  CompanyImagesService
} from "../../../types";
import { CompanyImageCreateValidationSchema, ErrorCode } from "../../../schema";
import type { ExistingCompany, Routes } from "../../../schema";
import {
  assertDefined,
  buildErrorResponse,
  sendResponse,
  wrapAsyncHandler
} from "../../../utils";
import { StatusCodes } from "http-status-codes";

/**
 * Creates company controllers.
 * @param service - The companies service.
 * @returns The company controllers.
 */
export function createCompanyImageControllers(
  service: CompanyImagesService
): CompanyImageControllers {
  return {
    addImage: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const companyImage = CompanyImageCreateValidationSchema.safeParse(
        req.body
      );

      if (companyImage.success) {
        const existingCompany: ExistingCompany | undefined =
          await service.addImage(id, companyImage.data.image);

        if (existingCompany)
          sendResponse<Routes["/companies/{id}/images"]["post"]>(
            res,
            StatusCodes.CREATED,
            existingCompany
          );
        else
          sendResponse<Routes["/companies/{id}/images"]["post"]>(
            res,
            StatusCodes.NOT_FOUND,
            buildErrorResponse(ErrorCode.NotFound)
          );
      } else
        sendResponse<Routes["/companies/{id}/images"]["post"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, companyImage.error)
        );
    }),

    deleteImage: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const assetId = assertDefined(req.params["assetId"]);

      const affectedRows = await service.deleteImage(id, assetId);

      sendResponse<Routes["/companies/{id}/images/{assetId}"]["delete"]>(
        res,
        StatusCodes.OK,
        { affectedRows }
      );
    }),

    updateImage: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const assetId = assertDefined(req.params["assetId"]);

      const companyImage = CompanyImageCreateValidationSchema.safeParse(
        req.body
      );

      if (companyImage.success) {
        const existingCompany = await service.updateImage(
          id,
          assetId,
          companyImage.data.image
        );

        if (existingCompany)
          sendResponse<Routes["/companies/{id}/images/{assetId}"]["put"]>(
            res,
            StatusCodes.OK,
            existingCompany
          );
        else
          sendResponse<Routes["/companies/{id}/images/{assetId}"]["put"]>(
            res,
            StatusCodes.NOT_FOUND,
            buildErrorResponse(ErrorCode.NotFound)
          );
      } else
        sendResponse<Routes["/companies/{id}/images/{assetId}"]["put"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, companyImage.error)
        );
    })
  };
}
