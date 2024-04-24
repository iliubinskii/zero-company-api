"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../utils");
const i18next_1 = require("i18next");
/**
 * Creates category controllers.
 * @param service - The categories service.
 * @returns The category controllers.
 */
function createCategoryControllers(service) {
    return {
        addCategory: async (req, res, next) => {
            try {
                const category = (0, utils_1.assertDefined)(req.customCategory);
                const addedCategory = await service.addCategory(category);
                res.status(http_status_codes_1.StatusCodes.CREATED).json(addedCategory);
            }
            catch (err) {
                next(err);
            }
        },
        deleteCategory: async (req, res, next) => {
            try {
                const id = (0, utils_1.assertDefined)(req.params["id"]);
                const affectedRows = await service.deleteCategory(id);
                res.status(http_status_codes_1.StatusCodes.OK).send({ affectedRows });
            }
            catch (err) {
                next(err);
            }
        },
        getCategories: async (_req, res, next) => {
            try {
                const categories = await service.getCategories();
                res.json(categories);
            }
            catch (err) {
                next(err);
            }
        },
        getCategory: async (req, res, next) => {
            try {
                const id = (0, utils_1.assertDefined)(req.params["id"]);
                const category = await service.getCategory(id);
                if (category)
                    res.json(category);
                else
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .json({ error: (0, i18next_1.t)("CategoryNotFound") });
            }
            catch (err) {
                next(err);
            }
        },
        updateCategory: async (req, res, next) => {
            try {
                const id = (0, utils_1.assertDefined)(req.params["id"]);
                const category = (0, utils_1.assertDefined)(req.customCategory);
                const updatedCategory = await service.updateCategory(id, category);
                if (updatedCategory)
                    res.status(http_status_codes_1.StatusCodes.OK).json(updatedCategory);
                else
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .json({ error: (0, i18next_1.t)("CategoryNotFound") });
            }
            catch (err) {
                next(err);
            }
        }
    };
}
exports.createCategoryControllers = createCategoryControllers;
//# sourceMappingURL=controllers.js.map