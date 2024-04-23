"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("./config");
const express_1 = tslib_1.__importDefault(require("express"));
const langs_1 = require("./langs");
const i18next_1 = require("i18next");
(0, langs_1.initLangs)();
const app = (0, express_1.default)();
app.get("/", (_req, res) => {
    const greeting = (0, i18next_1.t)("greeting");
    res.json({ greeting });
});
app.listen(config_1.PORT);
//# sourceMappingURL=index.js.map