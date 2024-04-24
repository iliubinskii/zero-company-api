"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoriesService = void 0;
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
            return addedCategory;
        },
        deleteCategory: async (id) => {
            const result = await Model.findByIdAndDelete(id);
            return result ? 1 : 0;
        },
        getCategories: async () => {
            const categories = await Model.find({});
            return categories;
        },
        getCategory: async (id) => {
            const category = await Model.findById(id);
            return category ?? undefined;
        },
        updateCategory: async (id, category) => {
            const mongodbCategory = new Model(category);
            const result = await Model.findByIdAndUpdate(id, mongodbCategory);
            return result ?? undefined;
        }
    };
}
exports.createCategoriesService = createCategoriesService;
const Schema = new mongoose_1.default.Schema({
    description: { required: true, type: String },
    name: { required: true, type: String },
    tagline: { required: true, type: String }
});
const Model = mongoose_1.default.model("Category", Schema);
//# sourceMappingURL=service.js.map