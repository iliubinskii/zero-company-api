"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongodb = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
/**
 * Connects to MongoDB.
 * @param endpoint - Endpoint to connect to MongoDB.
 * @param databaseName - Name of the database to connect to.
 */
async function connectMongodb(endpoint, databaseName) {
    await mongoose_1.default.connect(endpoint, { dbName: databaseName });
}
exports.connectMongodb = connectMongodb;
//# sourceMappingURL=mongodb.js.map