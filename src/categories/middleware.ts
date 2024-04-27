import {
  CategoryUpdateValidationSchema,
  CategoryValidationSchema,
  GetCategoriesOptionsValidationSchema,
  GetCompaniesByCategoryOptionsValidationSchema
} from "./validation-schema";
import { CategoriesMiddleware } from "../types";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { filterUndefinedProperties } from "../utils";
import { lang } from "../langs";

export const categoriesMiddleware: CategoriesMiddleware = {
  requireValidCategory: (req, res, next) => {
    try {
      req.customCategory = CategoryValidationSchema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError)
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: lang.InvalidCategoryData, errors: err.errors });
      else throw err;
    }
  },
  requireValidCategoryUpdate: (req, res, next) => {
    try {
      req.customCategoryUpdate = filterUndefinedProperties(
        CategoryUpdateValidationSchema.parse(req.body)
      );
      next();
    } catch (err) {
      if (err instanceof ZodError)
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: lang.InvalidCategoryData, errors: err.errors });
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
          .json({ error: lang.InvalidQuery, errors: err.errors });
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
          .json({ error: lang.InvalidQuery, errors: err.errors });
      else throw err;
    }
  }
};
