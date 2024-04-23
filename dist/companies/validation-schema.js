"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyUpdateValidationSchema = exports.CompanyValidationSchema = void 0;
const tslib_1 = require("tslib");
const i18next_1 = require("i18next");
const zod_1 = tslib_1.__importDefault(require("zod"));
const name = zod_1.default.string().min(1, (0, i18next_1.t)("NameIsRequired"));
exports.CompanyValidationSchema = zod_1.default.object({
    name
});
exports.CompanyUpdateValidationSchema = zod_1.default.object({
    name: name.optional()
});
//# sourceMappingURL=validation-schema.js.map