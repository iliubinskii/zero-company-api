"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeCheck = exports.createCategoriesService = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
/**
 * Creates a MongoDB service for categories.
 * @returns A MongoDB service for categories.
 */
function createCategoriesService() {
    return {
        addCategory: async (category) => {
            const model = new Model(category);
            const addedCategory = await model.save();
            const { _id, ...rest } = addedCategory.toObject();
            return { id: _id.toString(), ...rest };
        },
        deleteCategory: async (id) => {
            const deletedCategory = await Model.findByIdAndDelete(id);
            return deletedCategory ? 1 : 0;
        },
        getCategories: async () => {
            const categories = await Model.find({});
            return categories.map(category => {
                const { _id, ...rest } = category.toObject();
                return { id: _id.toString(), ...rest };
            });
        },
        getCategory: async (id) => {
            const category = await Model.findById(id);
            if (category) {
                const { _id, ...rest } = category.toObject();
                return { id: _id.toString(), ...rest };
            }
            return undefined;
        },
        updateCategory: async (id, category) => {
            const model = new Model(category);
            const updatedCategory = await Model.findByIdAndUpdate(id, model);
            if (updatedCategory) {
                const { _id, ...rest } = updatedCategory.toObject();
                return { id: _id.toString(), ...rest };
            }
            return undefined;
        }
    };
}
exports.createCategoriesService = createCategoriesService;
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
    description: { required: true, type: String },
    name: { required: true, type: String },
    tagline: { required: true, type: String }
});
const Model = mongoose_1.default.model("Category", Schema);
//# sourceMappingURL=service.js.map