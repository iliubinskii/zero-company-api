"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("./config");
const express_1 = tslib_1.__importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.static("public"));
app.get("/", (_req, res) => {
    res.send("Success!");
});
app.get("/health", (_req, res) => {
    res.send("Health!");
});
// eslint-disable-next-line no-console -- Temp
app.listen(config_1.PORT, () => console.log("Server ready on port 3000."));
exports.default = app;
//# sourceMappingURL=index.js.map