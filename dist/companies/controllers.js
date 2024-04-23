"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompanyControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../utils");
const i18next_1 = require("i18next");
/**
 * Creates company controllers.
 * @param service - The companies service.
 * @returns The company controllers.
 */
function createCompanyControllers(service) {
    return {
        addCompany: async (req, res, next) => {
            try {
                const company = (0, utils_1.assertDefined)(req.customCompany);
                const addedCompany = await service.addCompany(company);
                res.status(http_status_codes_1.StatusCodes.CREATED).json(addedCompany);
            }
            catch (err) {
                next(err);
            }
        },
        deleteCompany: async (req, res, next) => {
            try {
                const id = (0, utils_1.assertDefined)(req.params["id"]);
                const affectedRows = await service.deleteCompany(id);
                res.status(http_status_codes_1.StatusCodes.OK).send({ affectedRows });
            }
            catch (err) {
                next(err);
            }
        },
        getCompanies: async (_req, res, next) => {
            try {
                const companies = await service.getCompanies();
                res.json(companies);
            }
            catch (err) {
                next(err);
            }
        },
        getCompany: async (req, res, next) => {
            try {
                const id = (0, utils_1.assertDefined)(req.params["id"]);
                const company = await service.getCompany(id);
                if (company)
                    res.json(company);
                else
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .json({ error: (0, i18next_1.t)("CompanyNotFound") });
            }
            catch (err) {
                next(err);
            }
        },
        updateCompany: async (req, res, next) => {
            try {
                const id = (0, utils_1.assertDefined)(req.params["id"]);
                const company = (0, utils_1.assertDefined)(req.customCompany);
                const updatedCompany = await service.updateCompany(id, company);
                if (updatedCompany)
                    res.status(http_status_codes_1.StatusCodes.OK).json(updatedCompany);
                else
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .json({ error: (0, i18next_1.t)("CompanyNotFound") });
            }
            catch (err) {
                next(err);
            }
        }
    };
}
exports.createCompanyControllers = createCompanyControllers;
//# sourceMappingURL=controllers.js.map