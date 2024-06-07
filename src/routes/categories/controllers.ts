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
  buildErrorResponse,
  sendResponse,
  wrapAsyncHandler
} from "../../utils";
import type { Routes } from "../../schema";
import { StatusCodes } from "http-status-codes";
import { createCrudControllers } from "../../services";

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
  const { crudService } = service;

  const crudControllers = createCrudControllers(
    crudService,
    CategoryCreateValidationSchema,
    CategoryUpdateValidationSchema
  );

  return {
    addCategory: crudControllers.addItem,
    deleteCategory: crudControllers.deleteItem,
    getCategories: wrapAsyncHandler(async (req, res) => {
      const options = GetCategoriesOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const categories = await service.getCategories(options.data);

        sendResponse<Routes["/categories"]["get"]>(
          res,
          StatusCodes.OK,
          categories
        );
      } else
        sendResponse<Routes["/categories"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    getCategory: crudControllers.getItem,
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
          companies
        );
      } else
        sendResponse<Routes["/categories/{id}/companies"]["get"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    updateCategory: crudControllers.updateItem
  };
}
