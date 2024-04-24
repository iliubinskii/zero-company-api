"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webAccessibleStorage = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("node:fs/promises"));
const providers_1 = require("../providers");
/**
 * A middleware that uploads files to a web-accessible storage.
 * @param req - The request object.
 * @param _res - The response object.
 * @param next - The next function.
 */
async function webAccessibleStorage(req, _res, next) {
    if (req.files && !Array.isArray(req.files)) {
        const entries = await Promise.all(Object.entries(req.files).map(async ([fieldName, files]) => {
            const urls = await Promise.all(files.map(async (file) => {
                const result = await (0, providers_1.uploadImage)(file.path, fieldName);
                // eslint-disable-next-line security/detect-non-literal-fs-filename -- Ok
                await promises_1.default.unlink(file.path);
                return result.secure_url;
            }));
            return [fieldName, urls];
        }));
        req.customUploads = Object.fromEntries(entries);
    }
    next();
}
exports.webAccessibleStorage = webAccessibleStorage;
//# sourceMappingURL=web-accessible-storage.js.map