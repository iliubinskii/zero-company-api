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
          greeting: "Hello world"
        }
      }
    }
  });
}
