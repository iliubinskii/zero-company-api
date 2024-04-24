"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyUpdateValidationSchema = exports.CompanyValidationSchema = void 0;
const tslib_1 = require("tslib");
const i18next_1 = require("i18next");
const zod_1 = tslib_1.__importDefault(require("zod"));
const header = zod_1.default.string().min(1, (0, i18next_1.t)("HeaderIsRequired"));
const images = zod_1.default
    .array(zod_1.default.string().min(1, (0, i18next_1.t)("ImagesAreRequired")))
    .min(1, (0, i18next_1.t)("ImagesAreRequired"));
const logo = zod_1.default.string().min(1, (0, i18next_1.t)("LogoIsRequired"));
const name = zod_1.default.string().min(1, (0, i18next_1.t)("NameIsRequired"));
exports.CompanyValidationSchema = zod_1.default.object({
    header,
    images,
    logo,
    name
});
exports.CompanyUpdateValidationSchema = zod_1.default.object({
    header: header.optional(),
    images: images.optional(),
    logo: logo.optional(),
    name: name.optional()
});
//# sourceMappingURL=validation-schema.js.map