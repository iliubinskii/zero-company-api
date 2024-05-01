import {
  CategoriesService,
  CategoryControllers,
  CompaniesService
} from "../../types";
import {
  assertDefined,
  buildErrorResponse,
  wrapAsyncHandler
} from "../../utils";
import { ErrorCode } from "../../schema";
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

      res.status(StatusCodes.CREATED).json(addedCategory);
    }),
    deleteCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

      const affectedRows = await service.deleteCategory(id);

      res.status(StatusCodes.OK).send({ affectedRows });
    }),
    getCategories: wrapAsyncHandler(async (req, res) => {
      const options = assertDefined(req.getCategoriesOptions);

      const categories = await service.getCategories(options);

      res.json(categories);
    }),
    getCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

      const category = await service.getCategory(id);

      if (category) res.json(category);
      else
        res
          .status(StatusCodes.NOT_FOUND)
          .json(buildErrorResponse(ErrorCode.CategoryNotFound));
    }),
    getCompaniesByCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

      const options = assertDefined(req.getCompaniesByCategoryOptions);

      const companies = await companiesService.getCompanies({
        ...options,
        category: id
      });

      res.json(companies);
    }),
    updateCategory: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.params["id"]);

      const category = assertDefined(req.categoryUpdate);

      const updatedCategory = await service.updateCategory(id, category);

      if (updatedCategory) res.status(StatusCodes.OK).json(updatedCategory);
      else
        res
          .status(StatusCodes.NOT_FOUND)
          .json(buildErrorResponse(ErrorCode.CategoryNotFound));
    })
  };
}
