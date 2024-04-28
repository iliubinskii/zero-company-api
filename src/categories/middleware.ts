import {
  CategoryUpdateValidationSchema,
  CategoryValidationSchema,
  GetCategoriesOptionsValidationSchema,
  GetCompaniesByCategoryOptionsValidationSchema
} from "./validation-schema";
import { buildErrorResponse, filterUndefinedProperties } from "../utils";
import { CategoriesMiddleware } from "../types";
import { ErrorCode } from "../schema";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const categoriesMiddleware: CategoriesMiddleware = {
  requireValidCategory: (req, res, next) => {
    try {
      req.category = CategoryValidationSchema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError)
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(buildErrorResponse(ErrorCode.InvalidCategoryData, err.errors));
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
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(buildErrorResponse(ErrorCode.InvalidCategoryData, err.errors));
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
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(buildErrorResponse(ErrorCode.InvalidQuery, err.errors));
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
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(buildErrorResponse(ErrorCode.InvalidQuery, err.errors));
      else throw err;
    }
  }
};
