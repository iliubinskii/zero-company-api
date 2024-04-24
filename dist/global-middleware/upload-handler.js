"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploadHandler = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../config");
const multer_1 = tslib_1.__importDefault(require("multer"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination(_req, _file, callback) {
        // eslint-disable-next-line unicorn/no-null -- Ok
        callback(null, config_1.MULTER_DESTINATION_PATH);
    },
    filename(_req, file, callback) {
        const basename = (0, uuid_1.v4)();
        const ext = node_path_1.default.extname(file.originalname);
        // eslint-disable-next-line unicorn/no-null -- Ok
        callback(null, `${basename}${ext}`);
    }
});
const upload = (0, multer_1.default)({ storage });
/**
 * Create a middleware to handle uploaded files
 * @param fileFields - The fields to handle
 * @returns The middleware
 */
function createUploadHandler(fileFields) {
    return upload.fields(Object.entries(fileFields).map(([name, maxCount]) => ({ maxCount, name })));
}
exports.createUploadHandler = createUploadHandler;
//# sourceMappingURL=upload-handler.js.map