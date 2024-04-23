"use strict";
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
                    greeting: "Hello world"
                }
            }
        }
    });
}
exports.initLangs = initLangs;
//# sourceMappingURL=index.js.map