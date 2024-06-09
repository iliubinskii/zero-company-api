import type {
  CategoriesService,
  CategoryControllers,
  CompaniesService
} from "../../types";
import {
  CategoryCreateValidationSchema,
  CategoryUpdateValidationSchema,
  ErrorCode,
  GetCategoriesOptionsValidationSchema,
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
 * Creates category controllers.
 * @param service - The categories service.
 * @param companiesService - The companies service.
 * @returns The category controllers.
 */
export function createCategoryControllers(
  service: CategoriesService,
  companiesService: CompaniesService
): CategoryControllers {
  return {
    addCategory: wrapAsyncHandler(async (req, res) => {
      const category = CategoryCreateValidationSchema.safeParse(req.body);

      if (category.success) {
        const addedCategory = await service.addCategory(category.data);

        sendResponse<Routes["/categories"]["post"]>(
          res,
          StatusCodes.CREATED,
          assertValidForJsonStringify(addedCategory)
        );
      } else
        sendResponse<Routes["/categories"]["post"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, category.error)
        );
    }),
    deleteCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const affectedRows = await service.deleteCategory(id);

      sendResponse<Routes["/categories/{id}"]["delete"]>(res, StatusCodes.OK, {
        affectedRows
      });
    }),
    getCategories: wrapAsyncHandler(async (req, res) => {
      const options = GetCategoriesOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const categories = await service.getCategories(options.data);

        sendResponse<Routes["/categories"]["get"]>(
          res,
          StatusCodes.OK,
          assertValidForJsonStringify(categories)
        );
      } else
        sendResponse<Routes["/categories"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    getCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const category = await service.getCategory(id);

      if (category)
        sendResponse<Routes["/categories/{id}"]["get"]>(
          res,
          StatusCodes.OK,
          assertValidForJsonStringify(category)
        );
      else
        sendResponse<Routes["/categories/{id}"]["get"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.NotFound)
        );
    }),
    getCompaniesByCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const options = GetCompaniesOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const companies = await companiesService.getCompanies(options.data, {
          category: id,
          type: "category"
        });

        sendResponse<Routes["/categories/{id}/companies"]["get"]>(
          res,
          StatusCodes.OK,
          assertValidForJsonStringify(companies)
        );
      } else
        sendResponse<Routes["/categories/{id}/companies"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    updateCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const category = CategoryUpdateValidationSchema.safeParse(req.body);

      if (category.success) {
        const updatedCategory = await service.updateCategory(id, category.data);

        if (updatedCategory)
          sendResponse<Routes["/categories/{id}"]["put"]>(
            res,
            StatusCodes.OK,
            assertValidForJsonStringify(updatedCategory)
          );
        else
          sendResponse<Routes["/categories/{id}"]["put"]>(
            res,
            StatusCodes.NOT_FOUND,
            buildErrorResponse(ErrorCode.NotFound)
          );
      } else
        sendResponse<Routes["/categories/{id}"]["put"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidData, category.error)
        );
    })
  };
}
