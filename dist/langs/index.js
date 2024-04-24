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
                    CategoryNotFound: "Category not found",
                    CompanyNotFound: "Company not found",
                    DescriptionIsRequired: "Description is required",
                    HeaderIsRequired: "Header is required",
                    HelloWorld: "Hello world",
                    ImagesAreRequired: "At least one image is required",
                    InternalServerError: "Internal server error",
                    InvalidCategoryData: "Invalid category data",
                    InvalidCompanyData: "Invalid company data",
                    LogoIsRequired: "Logo is required",
                    NameIsRequired: "Name is required",
                    TaglineIsRequired: "Tagline is required"
                }
            }
        }
    });
}
exports.initLangs = initLangs;
//# sourceMappingURL=index.js.map