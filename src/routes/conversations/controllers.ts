import type {
  ConversationControllers,
  ConversationsService
} from "../../types";
import {
  ConversationCreateValidationSchema,
  ConversationUpdateValidationSchema,
  ErrorCode,
  GetConversationsOptionsValidationSchema
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
 * Creates conversation controllers.
 * @param service - The conversations service.
 * @returns The conversation controllers.
 */
export function createConversationControllers(
  service: ConversationsService
): ConversationControllers {
  return {
    addConversation: wrapAsyncHandler(async (req, res) => {
      const parsed = ConversationCreateValidationSchema.safeParse(req.body);

      if (parsed.success) {
        const conversation = await service.addConversation(parsed.data);

        sendResponse<Routes["/conversations"]["post"]>(
          res,
          StatusCodes.CREATED,
          dangerouslyAssumeJsonTransform(conversation)
        );
      } else
        sendResponse<Routes["/conversations"]["post"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, parsed.error)
        );
    }),
    deleteConversation: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const affectedRows = await service.deleteConversation(id);

      sendResponse<Routes["/conversations/{id}"]["delete"]>(
        res,
        StatusCodes.OK,
        {
          affectedRows
        }
      );
    }),
    getConversation: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const conversation = await service.getConversation(id);

      if (conversation)
        sendResponse<Routes["/conversations/{id}"]["get"]>(
          res,
          StatusCodes.OK,
          dangerouslyAssumeJsonTransform(conversation)
        );
      else
        sendResponse<Routes["/conversations/{id}"]["get"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.NotFound)
        );
    }),
    getConversations: wrapAsyncHandler(async (req, res) => {
      const options = GetConversationsOptionsValidationSchema.safeParse(
        req.query
      );

      if (options.success) {
        const conversations = await service.getConversations(options.data);

        sendResponse<Routes["/conversations"]["get"]>(
          res,
          StatusCodes.OK,
          dangerouslyAssumeJsonTransform(conversations)
        );
      } else
        sendResponse<Routes["/conversations"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    updateConversation: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const parsed = ConversationUpdateValidationSchema.safeParse(req.body);

      if (parsed.success) {
        const conversation = await service.updateConversation(id, parsed.data);

        if (conversation)
          sendResponse<Routes["/conversations/{id}"]["put"]>(
            res,
            StatusCodes.OK,
            dangerouslyAssumeJsonTransform(conversation)
          );
        else
          sendResponse<Routes["/conversations/{id}"]["put"]>(
            res,
            StatusCodes.NOT_FOUND,
            buildErrorResponse(ErrorCode.NotFound)
          );
      } else
        sendResponse<Routes["/conversations/{id}"]["put"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, parsed.error)
        );
    })
  };
}
