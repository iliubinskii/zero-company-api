"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireValidCategoryUpdate = exports.requireValidCategory = void 0;
const validation_schema_1 = require("./validation-schema");
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../utils");
const i18next_1 = require("i18next");
/**
 * Middleware to require a valid category object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
function requireValidCategory(req, res, next) {
    try {
        req.customCategory = validation_schema_1.CategoryValidationSchema.parse(req.body);
        next();
    }
    catch {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: (0, i18next_1.t)("InvalidCategoryData") });
    }
}
exports.requireValidCategory = requireValidCategory;
/**
 * Middleware to require a valid category update object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
function requireValidCategoryUpdate(req, res, next) {
    try {
        req.customCategoryUpdate = (0, utils_1.filterUndefinedProperties)(validation_schema_1.CategoryUpdateValidationSchema.parse(req.body));
        next();
    }
    catch {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: (0, i18next_1.t)("InvalidCategoryData") });
    }
}
exports.requireValidCategoryUpdate = requireValidCategoryUpdate;
//# sourceMappingURL=middleware.js.map