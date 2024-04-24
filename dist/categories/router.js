"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoriesRouter = void 0;
const tslib_1 = require("tslib");
const middleware_1 = require("./middleware");
const express_1 = tslib_1.__importDefault(require("express"));
/**
 * Creates a router for category routes.
 * @param controllers - The controllers for the category routes.
 * @returns A router for category routes.
 */
function createCategoriesRouter(controllers) {
    const router = express_1.default.Router();
    router
        .get("/", controllers.getCategories)
        .post("/", middleware_1.requireValidCategory, controllers.addCategory)
        .get("/:id", controllers.getCategory)
        .put("/:id", middleware_1.requireValidCategoryUpdate, controllers.updateCategory)
        .delete("/:id", controllers.deleteCategory);
    return router;
}
exports.createCategoriesRouter = createCategoriesRouter;
//# sourceMappingURL=router.js.map