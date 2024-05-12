import {
  CategoryCreateValidationSchema,
  CategoryUpdateValidationSchema,
  ErrorCode,
  GetCategoriesOptionsValidationSchema,
  GetCompaniesByCategoryOptionsValidationSchema,
  RoutesOld
} from "../../schema";
import {
  buildErrorResponse,
  filterUndefinedProperties,
  sendResponseOld
} from "../../utils";
import { CategoriesMiddleware } from "../../types";
import { StatusCodes } from "http-status-codes";

export const categoriesMiddleware: CategoriesMiddleware = {
  requireValidCategoryCreate: (req, res, next) => {
    const categoryCreate = CategoryCreateValidationSchema.safeParse(req.body);

    if (categoryCreate.success) {
      req.categoryCreate = categoryCreate.data;
      next();
    } else
      sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidCategoryData"]>(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(
          ErrorCode.InvalidCategoryData,
          categoryCreate.error.errors
        )
      );
  },
  requireValidCategoryUpdate: (req, res, next) => {
    const categoryUpdate = CategoryUpdateValidationSchema.safeParse(req.body);

    if (categoryUpdate.success) {
      req.categoryUpdate = filterUndefinedProperties(categoryUpdate.data);
      next();
    } else
      sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidCategoryData"]>(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(
          ErrorCode.InvalidCategoryData,
          categoryUpdate.error.errors
        )
      );
  },
  requireValidGetCategoriesOptions: (req, res, next) => {
    const getCategoriesOptions = GetCategoriesOptionsValidationSchema.safeParse(
      req.query
    );

    if (getCategoriesOptions.success) {
      req.getCategoriesOptions = filterUndefinedProperties(
        getCategoriesOptions.data
      );
      next();
    } else
      sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidQuery"]>(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(
          ErrorCode.InvalidQuery,
          getCategoriesOptions.error.errors
        )
      );
  },
  requireValidGetCompaniesByCategoryOptions: (req, res, next) => {
    const getCompaniesByCategoryOptions =
      GetCompaniesByCategoryOptionsValidationSchema.safeParse(req.query);

    if (getCompaniesByCategoryOptions.success) {
      req.getCompaniesByCategoryOptions = filterUndefinedProperties(
        getCompaniesByCategoryOptions.data
      );
      next();
    } else
      sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidQuery"]>(
        res,
        StatusCodes.BAD_REQUEST,
        buildErrorResponse(
          ErrorCode.InvalidQuery,
          getCompaniesByCategoryOptions.error.errors
        )
      );
  }
};
