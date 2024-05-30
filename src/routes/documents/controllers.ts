import type { DocumentControllers, DocumentsService } from "../../types";
import {
  DocumentCreateValidationSchema,
  DocumentUpdateValidationSchema,
  ErrorCode,
  GetDocumentsOptionsValidationSchema
} from "../../schema";
import {
  buildErrorResponse,
  filterUndefinedProperties,
  sendResponse,
  wrapAsyncHandler
} from "../../utils";
import type { Routes } from "../../schema";
import { StatusCodes } from "http-status-codes";
import { createCrudControllers } from "../../services";

/**
 * Creates document controllers.
 * @param service - The documents service.
 * @returns The document controllers.
 */
export function createDocumentControllers(
  service: DocumentsService
): DocumentControllers {
  const { crudService } = service;

  const crudControllers = createCrudControllers(
    crudService,
    {
      safeParse: item => {
        const result = DocumentCreateValidationSchema.safeParse(item);

        if (result.success)
          return {
            data: filterUndefinedProperties(result.data),
            success: true
          };

        return result;
      }
    },
    {
      safeParse: item => {
        const result = DocumentUpdateValidationSchema.safeParse(item);

        if (result.success)
          return {
            data: filterUndefinedProperties(result.data),
            success: true
          };

        return result;
      }
    }
  );

  return {
    addDocument: crudControllers.addItem,
    deleteDocument: crudControllers.addItem,
    getDocument: crudControllers.getItem,
    getDocuments: wrapAsyncHandler(async (req, res) => {
      const options = GetDocumentsOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const documents = await service.getDocuments(
          filterUndefinedProperties(options.data)
        );

        sendResponse<Routes["/documents"]["get"]>(
          res,
          StatusCodes.OK,
          documents
        );
      } else
        sendResponse<Routes["/documents"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    updateDocument: crudControllers.updateItem
  };
}
