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
            const { _id, ...rest } = addedCompany.toObject();
            return { id: _id.toString(), ...rest };
        },
        deleteCompany: async (id) => {
            const deletedCompany = await Model.findByIdAndDelete(id);
            return deletedCompany ? 1 : 0;
        },
        getCompanies: async () => {
            const companies = await Model.find({});
            return companies.map(company => {
                const { _id, ...rest } = company.toObject();
                return { id: _id.toString(), ...rest };
            });
        },
        getCompany: async (id) => {
            const company = await Model.findById(id);
            if (company) {
                const { _id, ...rest } = company.toObject();
                return { id: _id.toString(), ...rest };
            }
            return undefined;
        },
        updateCompany: async (id, company) => {
            const model = new Model(company);
            const updatedCompany = await Model.findByIdAndUpdate(id, model);
            if (updatedCompany) {
                const { _id, ...rest } = updatedCompany.toObject();
                return { id: _id.toString(), ...rest };
            }
            return undefined;
        }
    };
}
exports.createCompaniesService = createCompaniesService;
/**
 * Type check
 * @param value - Value
 * @returns Value
 */
function typeCheck(value) {
    return value;
}
exports.typeCheck = typeCheck;
const Schema = new mongoose_1.default.Schema({
    categories: { required: true, type: [String] },
    header: { required: true, type: String },
    images: { required: true, type: [String] },
    logo: { required: true, type: String },
    name: { required: true, type: String }
});
const Model = mongoose_1.default.model("Company", Schema);
//# sourceMappingURL=service.js.map