"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireValidCompanyUpdate = exports.requireValidCompany = void 0;
const validation_schema_1 = require("./validation-schema");
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../utils");
const i18next_1 = require("i18next");
/**
 * Middleware to require a valid company object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
function requireValidCompany(req, res, next) {
    try {
        req.customCompany = validation_schema_1.CompanyValidationSchema.parse(req.body);
        next();
    }
    catch {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: (0, i18next_1.t)("InvalidCompanyData") });
    }
}
exports.requireValidCompany = requireValidCompany;
/**
 * Middleware to require a valid company update object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
function requireValidCompanyUpdate(req, res, next) {
    try {
        req.customCompanyUpdate = (0, utils_1.filterUndefinedProperties)(validation_schema_1.CompanyUpdateValidationSchema.parse(req.body));
        next();
    }
    catch {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: (0, i18next_1.t)("InvalidCompanyData") });
    }
}
exports.requireValidCompanyUpdate = requireValidCompanyUpdate;
//# sourceMappingURL=middleware.js.map