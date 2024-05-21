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
  GetCompaniesByCategoryOptionsValidationSchema
} from "../../schema";
import {
  assertDefined,
  buildErrorResponse,
  filterUndefinedProperties,
  sendResponseOld,
  wrapAsyncHandler
} from "../../utils";
import type { RoutesOld } from "../../schema";
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
        const addedCategory = await service.addCategory(
          filterUndefinedProperties(category.data)
        );

        sendResponseOld<RoutesOld["/categories"]["/"]["POST"]>(
          res,
          StatusCodes.CREATED,
          addedCategory
        );
      } else
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidCategoryData"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidCategoryData, category.error)
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
      const options = GetCategoriesOptionsValidationSchema.safeParse(req.query);

      if (options.success) {
        const categories = await service.getCategories(
          filterUndefinedProperties(options.data)
        );

        sendResponseOld<RoutesOld["/categories"]["/"]["GET"]>(
          res,
          StatusCodes.OK,
          categories
        );
      } else
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidQuery"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
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

      const options = GetCompaniesByCategoryOptionsValidationSchema.safeParse(
        req.query
      );

      if (options.success) {
        const companies = await companiesService.getCompanies({
          ...filterUndefinedProperties(options.data),
          category: id
        });

        sendResponseOld<RoutesOld["/categories"]["/:id/companies"]["GET"]>(
          res,
          StatusCodes.OK,
          companies
        );
      } else
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidQuery"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, options.error)
        );
    }),
    updateCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const category = CategoryUpdateValidationSchema.safeParse(req.body);

      if (category.success) {
        const updatedCategory = await service.updateCategory(
          id,
          filterUndefinedProperties(category.data)
        );

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
      } else
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidCategoryData"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidCategoryData, category.error)
        );
    })
  };
}
