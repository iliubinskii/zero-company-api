"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeCheck = exports.createCompaniesService = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
/**
 * Creates a MongoDB service for companies.
 * @returns A MongoDB service for companies.
 */
function createCompaniesService() {
    return {
        addCompany: async (company) => {
            const model = new Model(company);
            const addedCompany = await model.save();
            return addedCompany;
        },
        deleteCompany: async (id) => {
            const result = await Model.findByIdAndDelete(id);
            return result ? 1 : 0;
        },
        getCompanies: async () => {
            const companies = await Model.find({});
            return companies;
        },
        getCompany: async (id) => {
            const company = await Model.findById(id);
            return company ?? undefined;
        },
        updateCompany: async (id, company) => {
            const mongodbCompany = new Model(company);
            const result = await Model.findByIdAndUpdate(id, mongodbCompany);
            return result ?? undefined;
        }
    };
}
exports.createCompaniesService = createCompaniesService;
const Schema = new mongoose_1.default.Schema({
    categories: { required: true, type: [String] },
    header: { required: true, type: String },
    images: { required: true, type: [String] },
    logo: { required: true, type: String },
    name: { required: true, type: String }
});
const Model = mongoose_1.default.model("Company", Schema);
/**
 * Type check
 * @param value - Value
 * @returns Value
 */
function typeCheck(value) {
    return value;
}
exports.typeCheck = typeCheck;
//# sourceMappingURL=service.js.map