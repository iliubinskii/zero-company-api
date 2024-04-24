"use strict";
// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Typing for i18next "resources" property and "t" function
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLangs = void 0;
const i18next_1 = require("i18next");
/**
 * Initializes the i18next library with the default language and resources.
 */
function initLangs() {
    (0, i18next_1.init)({
        lng: "en",
        resources: {
            en: {
                translation: {
                    CompanyNotFound: "Company not found",
                    HelloWorld: "Hello world",
                    InternalServerError: "Internal server error",
                    InvalidCompanyData: "Invalid company data",
                    NameIsRequired: "Name is required"
                }
            }
        }
    });
}
exports.initLangs = initLangs;
//# sourceMappingURL=index.js.map