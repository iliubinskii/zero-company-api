"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUpdateValidationSchema = exports.CategoryValidationSchema = void 0;
const tslib_1 = require("tslib");
const i18next_1 = require("i18next");
const zod_1 = tslib_1.__importDefault(require("zod"));
const description = zod_1.default.string().min(1, (0, i18next_1.t)("DescriptionIsRequired"));
const name = zod_1.default.string().min(1, (0, i18next_1.t)("NameIsRequired"));
const tagline = zod_1.default.string().min(1, (0, i18next_1.t)("TaglineIsRequired"));
exports.CategoryValidationSchema = zod_1.default.object({
    description,
    name,
    tagline
});
exports.CategoryUpdateValidationSchema = zod_1.default.object({
    description: description.optional(),
    name: name.optional(),
    tagline: tagline.optional()
});
//# sourceMappingURL=validation-schema.js.map