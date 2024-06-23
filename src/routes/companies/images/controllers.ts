import type {
  CompanyImageControllers,
  CompanyImagesService
} from "../../../types";
import { CompanyImageCreateValidationSchema, ErrorCode } from "../../../schema";
import {
  assertDefined,
  buildErrorResponse,
  dangerouslyAssumeJsonTransform,
  sendResponse,
  wrapAsyncHandler
} from "../../../utils";
import type { Routes } from "../../../schema";
import { StatusCodes } from "http-status-codes";

/**
 * Create company image controllers
 * @param service Company images service
 * @returns Company image controllers
 */
export function createCompanyImageControllers(
  service: CompanyImagesService
): CompanyImageControllers {
  return {
    addImage: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const image = CompanyImageCreateValidationSchema.safeParse(req.body);

      if (image.success) {
        const company = await service.addImage(id, image.data.image);

        if (company)
          sendResponse<Routes["/companies/{id}/images"]["post"]>(
            res,
            StatusCodes.CREATED,
            dangerouslyAssumeJsonTransform(company)
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
          buildErrorResponse(ErrorCode.InvalidData, image.error)
        );
    }),
    deleteImage: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const assetId = assertDefined(req.params["assetId"]);

      const company = await service.deleteImage(id, assetId);

      if (company)
        sendResponse<Routes["/companies/{id}/images/{assetId}"]["delete"]>(
          res,
          StatusCodes.OK,
          dangerouslyAssumeJsonTransform(company)
        );
      else
        sendResponse<Routes["/companies/{id}/images/{assetId}"]["delete"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.NotFound)
        );
    }),
    updateImage: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const assetId = assertDefined(req.params["assetId"]);

      const image = CompanyImageCreateValidationSchema.safeParse(req.body);

      if (image.success) {
        const company = await service.updateImage(
          id,
          assetId,
          image.data.image
        );

        if (company)
          sendResponse<Routes["/companies/{id}/images/{assetId}"]["put"]>(
            res,
            StatusCodes.OK,
            dangerouslyAssumeJsonTransform(company)
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
          buildErrorResponse(ErrorCode.InvalidData, image.error)
        );
    })
  };
}
