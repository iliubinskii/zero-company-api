import {
  CategoryCreateValidationSchema,
  CategoryUpdateValidationSchema,
  GetCategoriesOptionsValidationSchema,
  GetCompaniesByCategoryOptionsValidationSchema
} from "../../validation-schema";
import { ErrorCode, RoutesOld } from "../../schema";
import {
  buildErrorResponse,
  filterUndefinedProperties,
  sendResponseOld
} from "../../utils";
import { CategoriesMiddleware } from "../../types";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const categoriesMiddleware: CategoriesMiddleware = {
  requireValidCategory: (req, res, next) => {
    try {
      req.categoryCreate = CategoryCreateValidationSchema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError)
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidCategoryData"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidCategoryData, err.errors)
        );
      else throw err;
    }
  },
  requireValidCategoryUpdate: (req, res, next) => {
    try {
      req.categoryUpdate = filterUndefinedProperties(
        CategoryUpdateValidationSchema.parse(req.body)
      );
      next();
    } catch (err) {
      if (err instanceof ZodError)
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidCategoryData"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidCategoryData, err.errors)
        );
      else throw err;
    }
  },
  requireValidGetCategoriesOptions: (req, res, next) => {
    try {
      req.getCategoriesOptions = filterUndefinedProperties(
        GetCategoriesOptionsValidationSchema.parse(req.query)
      );
      next();
    } catch (err) {
      if (err instanceof ZodError)
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidQuery"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, err.errors)
        );
      else throw err;
    }
  },
  requireValidGetCompaniesByCategoryOptions: (req, res, next) => {
    try {
      req.getCompaniesByCategoryOptions = filterUndefinedProperties(
        GetCompaniesByCategoryOptionsValidationSchema.parse(req.query)
      );
      next();
    } catch (err) {
      if (err instanceof ZodError)
        sendResponseOld<RoutesOld["*"]["BAD_REQUEST"]["InvalidQuery"]>(
          res,
          StatusCodes.BAD_REQUEST,
          buildErrorResponse(ErrorCode.InvalidQuery, err.errors)
        );
      else throw err;
    }
  }
};
