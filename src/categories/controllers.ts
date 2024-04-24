import { CategoriesService, CategoryControllers } from "../schema";
import { StatusCodes } from "http-status-codes";
import { assertDefined } from "../utils";
import { t } from "i18next";

/**
 * Creates category controllers.
 * @param service - The categories service.
 * @returns The category controllers.
 */
export function createCategoryControllers(
  service: CategoriesService
): CategoryControllers {
  return {
    addCategory: async (req, res, next) => {
      try {
        const category = assertDefined(req.customCategory);

        const addedCategory = await service.addCategory(category);

        res.status(StatusCodes.CREATED).json(addedCategory);
      } catch (err) {
        next(err);
      }
    },
    deleteCategory: async (req, res, next) => {
      try {
        const id = assertDefined(req.params["id"]);

        const affectedRows = await service.deleteCategory(id);

        res.status(StatusCodes.OK).send({ affectedRows });
      } catch (err) {
        next(err);
      }
    },
    getCategories: async (_req, res, next) => {
      try {
        const categories = await service.getCategories();

        res.json(categories);
      } catch (err) {
        next(err);
      }
    },
    getCategory: async (req, res, next) => {
      try {
        const id = assertDefined(req.params["id"]);

        const category = await service.getCategory(id);

        if (category) res.json(category);
        else
          res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: t("CategoryNotFound") });
      } catch (err) {
        next(err);
      }
    },
    updateCategory: async (req, res, next) => {
      try {
        const id = assertDefined(req.params["id"]);

        const category = assertDefined(req.customCategory);

        const updatedCategory = await service.updateCategory(id, category);

        if (updatedCategory) res.status(StatusCodes.OK).json(updatedCategory);
        else
          res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: t("CategoryNotFound") });
      } catch (err) {
        next(err);
      }
    }
  };
}
