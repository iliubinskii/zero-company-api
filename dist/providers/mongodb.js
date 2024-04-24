"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongodb = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../config");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
/**
 * Connects to MongoDB.
 */
async function connectMongodb() {
    await mongoose_1.default.connect(config_1.MONGODB_URI, { dbName: config_1.MONGODB_DATABASE_NAME });
}
exports.connectMongodb = connectMongodb;
//# sourceMappingURL=mongodb.js.map