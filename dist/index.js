"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const web_accessible_storage_1 = require("./global-middleware/web-accessible-storage");
const companies_1 = require("./companies");
const config_1 = require("./config");
const http_status_codes_1 = require("http-status-codes");
const providers_1 = require("./providers");
const global_middleware_1 = require("./global-middleware");
const express_1 = tslib_1.__importDefault(require("express"));
const langs_1 = require("./langs");
const global_services_1 = require("./global-services");
const i18next_1 = require("i18next");
(0, langs_1.initLangs)();
(0, providers_1.connectMongodb)();
const app = (0, express_1.default)();
app.get("/", (_req, res) => {
    res.json({ greeting: (0, i18next_1.t)("HelloWorld") });
});
app.use("/companies", (0, companies_1.createCompaniesRouter)((0, companies_1.createCompanyControllers)((0, companies_1.createCompaniesService)())));
app.post("/test-upload", (0, global_middleware_1.createUploadHandler)({
    header: 1,
    images: 10,
    logo: 1
}), (0, web_accessible_storage_1.createWebAccessibleStorage)({
    header: web_accessible_storage_1.FieldType.single,
    images: web_accessible_storage_1.FieldType.multiple,
    logo: web_accessible_storage_1.FieldType.single
}), (req, res) => {
    res.json({ uploads: req.body });
});
app.use((err, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Ok
_next) => {
    global_services_1.logger.error(err);
    res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: (0, i18next_1.t)("InternalServerError") });
});
app.listen(config_1.PORT);
//# sourceMappingURL=index.js.map