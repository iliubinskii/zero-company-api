"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("./config");
const companies_1 = require("./companies");
const service_1 = require("./companies/service");
const controllers_1 = require("./companies/controllers");
const express_1 = tslib_1.__importDefault(require("express"));
const langs_1 = require("./langs");
const i18next_1 = require("i18next");
(0, langs_1.initLangs)();
const app = (0, express_1.default)();
app.get("/", (_req, res) => {
    res.json({ greeting: (0, i18next_1.t)("HelloWorld") });
});
app.use("/companies", (0, companies_1.createCompaniesRouter)((0, controllers_1.createCompanyControllers)((0, service_1.createCompaniesService)())));
app.listen(config_1.PORT);
//# sourceMappingURL=index.js.map