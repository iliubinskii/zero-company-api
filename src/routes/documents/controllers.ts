import type { DocumentControllers, DocumentsService } from "../../types";
import {
  DocumentCreateValidationSchema,
  DocumentUpdateValidationSchema,
  ErrorCode,
  GetDocumentsOptionsValidationSchema
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
 * Creates document controllers.
 * @param service - The documents service.
 * @returns The document controllers.
 */
export function createDocumentControllers(
  service: DocumentsService
): DocumentControllers {
  return {
    addDocument: wrapAsyncHandler(async (req, res) => {
      const parsed = DocumentCreateValidationSchema.safeParse(req.body);

      if (parsed.success) {
        const document = await service.addDocument({
          ...parsed.data,
          createdAt: new Date()
        });

        sendResponse<Routes["/documents"]["post"]>(
          res,
          StatusCodes.CREATED,
          dangerouslyAssumeJsonTransform(document)
        );
      } else
        sendResponse<Routes["/documents"]["post"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, parsed.error)
        );
    }),
    deleteDocument: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const affectedRows = await service.deleteDocument(id);

      sendResponse<Routes["/documents/{id}"]["delete"]>(res, StatusCodes.OK, {
        affectedRows
      });
    }),
    getDocument: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const document = await service.getDocument(id);

      if (document)
        sendResponse<Routes["/documents/{id}"]["get"]>(
          res,
          StatusCodes.OK,
          dangerouslyAssumeJsonTransform(document)
        );
      else
        sendResponse<Routes["/documents/{id}"]["get"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.NotFound)
        );
    }),
    getDocuments: wrapAsyncHandler(async (req, res) => {
      const options = GetDocumentsOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const documents = await service.getDocuments(options.data);

        sendResponse<Routes["/documents"]["get"]>(
          res,
          StatusCodes.OK,
          dangerouslyAssumeJsonTransform(documents)
        );
      } else
        sendResponse<Routes["/documents"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    updateDocument: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const parsed = DocumentUpdateValidationSchema.safeParse(req.body);

      if (parsed.success) {
        const document = await service.updateDocument(id, parsed.data);

        if (document)
          sendResponse<Routes["/documents/{id}"]["put"]>(
            res,
            StatusCodes.OK,
            dangerouslyAssumeJsonTransform(document)
          );
        else
          sendResponse<Routes["/documents/{id}"]["put"]>(
            res,
            StatusCodes.NOT_FOUND,
            buildErrorResponse(ErrorCode.NotFound)
          );
      } else
        sendResponse<Routes["/documents/{id}"]["put"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, parsed.error)
        );
    })
  };
}
