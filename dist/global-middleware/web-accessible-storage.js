"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldType = exports.createWebAccessibleStorage = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../utils");
const promises_1 = tslib_1.__importDefault(require("node:fs/promises"));
const providers_1 = require("../providers");
/**
 * Creates a middleware that uploads files to a web-accessible storage.
 * @param fields - The fields to upload.
 * @returns The middleware.
 */
function createWebAccessibleStorage(fields) {
    return async (req, _res, next) => {
        if (req.files && !Array.isArray(req.files)) {
            const uploads = await Promise.all(Object.entries(req.files).map(async ([fieldName, files]) => {
                const urls = await Promise.all(files.map(async (file) => {
                    const result = await (0, providers_1.uploadImage)(file.path, fieldName);
                    // eslint-disable-next-line security/detect-non-literal-fs-filename -- Ok
                    await promises_1.default.unlink(file.path);
                    return result.secure_url;
                }));
                return {
                    fieldName,
                    // eslint-disable-next-line security/detect-object-injection -- Ok
                    type: (0, utils_1.assertDefined)(fields[fieldName]),
                    urls
                };
            }));
            for (const { fieldName, type, urls } of uploads)
                switch (type) {
                    case FieldType.single: {
                        // eslint-disable-next-line security/detect-object-injection -- Ok
                        req.body[fieldName] = (0, utils_1.assertDefined)(urls[0]);
                        break;
                    }
                    case FieldType.multiple: {
                        // eslint-disable-next-line security/detect-object-injection -- Ok
                        req.body[fieldName] = urls;
                    }
                }
            next();
        }
    };
}
exports.createWebAccessibleStorage = createWebAccessibleStorage;
var FieldType;
(function (FieldType) {
    FieldType["multiple"] = "multiple";
    FieldType["single"] = "single";
})(FieldType || (exports.FieldType = FieldType = {}));
//# sourceMappingURL=web-accessible-storage.js.map