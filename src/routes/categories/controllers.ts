import {
  CategoriesService,
  CategoryControllers,
  CompaniesService
} from "../../types";
import { ErrorCode, Routes } from "../../schema";
import {
  assertDefined,
  buildErrorResponse,
  sendResponse,
  wrapAsyncHandler
} from "../../utils";
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
      const category = assertDefined(req.categoryCreate);

      const addedCategory = await service.addCategory(category);

      sendResponse<Routes["/categories"]["/"]["POST"]>(
        res,
        StatusCodes.CREATED,
        addedCategory
      );
    }),
    deleteCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

      const affectedRows = await service.deleteCategory(id);

      sendResponse<Routes["/categories"]["/:id"]["DELETE"]>(
        res,
        StatusCodes.OK,
        { affectedRows }
      );
    }),
    getCategories: wrapAsyncHandler(async (req, res) => {
      const options = assertDefined(req.getCategoriesOptions);

      const categories = await service.getCategories(options);

      sendResponse<Routes["/categories"]["/"]["GET"]>(
        res,
        StatusCodes.OK,
        categories
      );
    }),
    getCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

      const category = await service.getCategory(id);

      if (category)
        sendResponse<Routes["/categories"]["/:id"]["GET"]["OK"]>(
          res,
          StatusCodes.OK,
          category
        );
      else
        sendResponse<Routes["/categories"]["/:id"]["GET"]["NOT_FOUND"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.CategoryNotFound)
        );
    }),
    getCompaniesByCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

      const options = assertDefined(req.getCompaniesByCategoryOptions);

      const companies = await companiesService.getCompanies({
        ...options,
        category: id
      });

      sendResponse<Routes["/categories"]["/:id/companies"]["GET"]>(
        res,
        StatusCodes.OK,
        companies
      );
    }),
    updateCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

      const category = assertDefined(req.categoryUpdate);

      const updatedCategory = await service.updateCategory(id, category);

      if (updatedCategory)
        sendResponse<Routes["/categories"]["/:id"]["PUT"]["OK"]>(
          res,
          StatusCodes.OK,
          updatedCategory
        );
      else
        sendResponse<Routes["/categories"]["/:id"]["PUT"]["NOT_FOUND"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.CategoryNotFound)
        );
    })
  };
}
