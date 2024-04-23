// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Typing for i18next "resources" property and "t" function

import { init } from "i18next";

/**
 * Initializes the i18next library with the default language and resources.
 */
export function initLangs() {
  init({
    lng: "en",
    resources: {
      en: {
        translation: {
          CompanyNotFound: "Company not found",
          HelloWorld: "Hello world",
          InvalidCompanyData: "Invalid company data",
          NameIsRequired: "Name is required"
        }
      }
    }
  });
}
