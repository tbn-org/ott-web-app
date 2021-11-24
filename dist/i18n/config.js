import i18n from "../../_snowpack/pkg/i18next.js";
import {initReactI18next} from "../../_snowpack/pkg/react-i18next.js";
import LanguageDetector from "../../_snowpack/pkg/i18next-browser-languagedetector.js";
import * as en_US from "./locales/en_US.js";
const languageDetector = new LanguageDetector();
export const resources = {
  "en-US": en_US
};
i18n.use(initReactI18next).use(languageDetector).init({
  resources,
  lng: "en-US",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  },
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"]
  }
});
