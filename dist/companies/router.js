"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompaniesRouter = void 0;
const tslib_1 = require("tslib");
const middleware_1 = require("./middleware");
const express_1 = tslib_1.__importDefault(require("express"));
/**
 * Creates a router for company routes.
 * @param controllers - The controllers for the company routes.
 * @returns A router for company routes.
 */
function createCompaniesRouter(controllers) {
    const router = express_1.default.Router();
    router
        .get("/", controllers.getCompanies)
        .post("/", middleware_1.uploadHandler, middleware_1.webAccessibleStorage, middleware_1.requireValidCompany, controllers.addCompany)
        .get("/:id", controllers.getCompany)
        .put("/:id", middleware_1.uploadHandler, middleware_1.webAccessibleStorage, middleware_1.requireValidCompanyUpdate, controllers.updateCompany)
        .delete("/:id", controllers.deleteCompany);
    return router;
}
exports.createCompaniesRouter = createCompaniesRouter;
//# sourceMappingURL=router.js.map