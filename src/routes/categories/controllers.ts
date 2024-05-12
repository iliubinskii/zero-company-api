import {
  CategoriesService,
  CategoryControllers,
  CompaniesService
} from "../../types";
import { ErrorCode, RoutesOld } from "../../schema";
import {
  assertDefined,
  buildErrorResponse,
  sendResponseOld,
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

      sendResponseOld<RoutesOld["/categories"]["/"]["POST"]>(
        res,
        StatusCodes.CREATED,
        addedCategory
      );
    }),
    deleteCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const affectedRows = await service.deleteCategory(id);

      sendResponseOld<RoutesOld["/categories"]["/:id"]["DELETE"]>(
        res,
        StatusCodes.OK,
        { affectedRows }
      );
    }),
    getCategories: wrapAsyncHandler(async (req, res) => {
      const options = assertDefined(req.getCategoriesOptions);

      const categories = await service.getCategories(options);

      sendResponseOld<RoutesOld["/categories"]["/"]["GET"]>(
        res,
        StatusCodes.OK,
        categories
      );
    }),
    getCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const category = await service.getCategory(id);

      if (category)
        sendResponseOld<RoutesOld["/categories"]["/:id"]["GET"]["OK"]>(
          res,
          StatusCodes.OK,
          category
        );
      else
        sendResponseOld<RoutesOld["/categories"]["/:id"]["GET"]["NOT_FOUND"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.CategoryNotFound)
        );
    }),
    getCompaniesByCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const options = assertDefined(req.getCompaniesByCategoryOptions);

      const companies = await companiesService.getCompanies({
        ...options,
        category: id
      });

      sendResponseOld<RoutesOld["/categories"]["/:id/companies"]["GET"]>(
        res,
        StatusCodes.OK,
        companies
      );
    }),
    updateCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const category = assertDefined(req.categoryUpdate);

      const updatedCategory = await service.updateCategory(id, category);

      if (updatedCategory)
        sendResponseOld<RoutesOld["/categories"]["/:id"]["PUT"]["OK"]>(
          res,
          StatusCodes.OK,
          updatedCategory
        );
      else
        sendResponseOld<RoutesOld["/categories"]["/:id"]["PUT"]["NOT_FOUND"]>(
          res,
          StatusCodes.NOT_FOUND,
          buildErrorResponse(ErrorCode.CategoryNotFound)
        );
    })
  };
}
