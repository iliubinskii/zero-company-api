import type {
  CompaniesService,
  DocumentsService,
  GetCompaniesParentRef,
  GetDocumentsParentRef,
  UserControllers,
  UsersService
} from "../../types";
import {
  ErrorCode,
  GetCompaniesOptionsValidationSchema,
  GetDocumentsOptionsValidationSchema,
  GetUsersOptionsValidationSchema,
  UserCreateValidationSchema,
  UserUpdateValidationSchema
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
 * Creates user controllers.
 * @param service - The users service.
 * @param companiesService - The companies service.
 * @param documentsService - The documents service.
 * @returns The user controllers.
 */
export function createUserControllers(
  service: UsersService,
  companiesService: CompaniesService,
  documentsService: DocumentsService
): UserControllers {
  return {
    addUser: wrapAsyncHandler(async (req, res) => {
      const jwt = assertDefined(req.jwt);

      const parsed = UserCreateValidationSchema.safeParse(req.body);

      if (parsed.success) {
        const user = await service.addUser({
          ...parsed.data,
          email: jwt.email,
          favoriteCompanies: []
        });

        if (user)
          sendResponse<Routes["/users"]["post"]>(
            res,
            StatusCodes.CREATED,
            dangerouslyAssumeJsonTransform(user)
          );
        else
          sendResponse<Routes["/users"]["post"]>(
            res,
            StatusCodes.CONFLICT,
            buildErrorResponse(ErrorCode.AlreadyExists)
          );
      } else
        sendResponse<Routes["/users"]["post"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, parsed.error)
        );
    }),
    deleteUser: wrapAsyncHandler(async (req, res) => {
      const ref = assertDefined(req.userRef);

      const affectedRows = await service.deleteUser(ref);

      sendResponse<Routes["/users/{id}"]["delete"]>(res, StatusCodes.OK, {
        affectedRows
      });
    }),
    getCompaniesByUser: wrapAsyncHandler(async (req, res) => {
      const ref = assertDefined(req.userRef);

      const options = GetCompaniesOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const parentRef: GetCompaniesParentRef = (() => {
          switch (ref.type) {
            case "email": {
              return {
                founderEmail: ref.email,
                type: "founderEmail"
              };
            }

            case "id": {
              return {
                founderId: ref.id,
                type: "founderId"
              };
            }
          }
        })();

        const companies = await companiesService.getCompanies(
          options.data,
          parentRef
        );

        sendResponse<Routes["/users/{id}/companies"]["get"]>(
          res,
          StatusCodes.OK,
          dangerouslyAssumeJsonTransform(companies)
        );
      } else
        sendResponse<Routes["/users/{id}/companies"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    getDocumentsByUser: wrapAsyncHandler(async (req, res) => {
      const ref = assertDefined(req.userRef);

      const options = GetDocumentsOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const parentRef: GetDocumentsParentRef = (() => {
          switch (ref.type) {
            case "email": {
              return {
                signatoryEmail: ref.email,
                type: "signatoryEmail"
              };
            }

            case "id": {
              return {
                signatoryId: ref.id,
                type: "signatoryId"
              };
            }
          }
        })();

        const documents = await documentsService.getDocuments(
          options.data,
          parentRef
        );

        sendResponse<Routes["/users/{id}/documents"]["get"]>(
          res,
          StatusCodes.OK,
          dangerouslyAssumeJsonTransform(documents)
        );
      } else
        sendResponse<Routes["/users/{id}/documents"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    getFavoriteCompaniesByUser: wrapAsyncHandler(async (req, res) => {
      const ref = assertDefined(req.userRef);

      const options = GetCompaniesOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const parentRef: GetCompaniesParentRef = (() => {
          switch (ref.type) {
            case "email": {
              return {
                bookmarkUserEmail: ref.email,
                type: "bookmarkUserEmail"
              };
            }

            case "id": {
              return {
                bookmarkUserId: ref.id,
                type: "bookmarkUserId"
              };
            }
          }
        })();

        const companies = await companiesService.getCompanies(
          options.data,
          parentRef
        );

        sendResponse<Routes["/users/{id}/favorite-companies"]["get"]>(
          res,
          StatusCodes.OK,
          dangerouslyAssumeJsonTransform(companies)
        );
      } else
        sendResponse<Routes["/users/{id}/favorite-companies"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    getUser: wrapAsyncHandler(async (req, res) => {
      const ref = assertDefined(req.userRef);

      const user = await service.getUser(ref);

      if (user)
        sendResponse<Routes["/users/{id}"]["get"]>(
          res,
          StatusCodes.OK,
          dangerouslyAssumeJsonTransform(user)
        );
      else
        sendResponse<Routes["/users/{id}"]["get"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.NotFound)
        );
    }),
    getUsers: wrapAsyncHandler(async (req, res) => {
      const options = GetUsersOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const users = await service.getUsers(options.data);

        sendResponse<Routes["/users"]["get"]>(
          res,
          StatusCodes.OK,
          dangerouslyAssumeJsonTransform(users)
        );
      } else
        sendResponse<Routes["/users"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    updateUser: wrapAsyncHandler(async (req, res) => {
      const ref = assertDefined(req.userRef);

      const parsed = UserUpdateValidationSchema.safeParse(req.body);

      if (parsed.success) {
        const user = await service.updateUser(ref, parsed.data);

        if (user)
          sendResponse<Routes["/users/{id}"]["put"]>(
            res,
            StatusCodes.OK,
            dangerouslyAssumeJsonTransform(user)
          );
        else
          sendResponse<Routes["/users/{id}"]["put"]>(
            res,
            StatusCodes.NOT_FOUND,
            buildErrorResponse(ErrorCode.NotFound)
          );
      } else
        sendResponse<Routes["/users/{id}"]["put"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, parsed.error)
        );
    })
  };
}
