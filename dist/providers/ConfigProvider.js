import React, {createContext, useEffect, useState} from "../../_snowpack/pkg/react.js";
import merge from "../../_snowpack/pkg/lodash.merge.js";
import {calculateContrastColor} from "../utils/common.js";
import loadConfig, {validateConfig} from "../services/config.service.js";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay.js";
import {addScript} from "../utils/dom.js";
import {ConfigStore} from "../stores/ConfigStore.js";
const defaultConfig = {
  id: "",
  siteName: "",
  description: "",
  footerText: "",
  player: "",
  assets: {},
  content: [],
  menu: [],
  cleengId: null,
  cleengSandbox: true,
  options: {
    enableSharing: true,
    shelfTitles: true
  }
};
export const ConfigContext = createContext(defaultConfig);
const ConfigProvider = ({children, configLocation, onLoading, onValidationError, onValidationCompleted}) => {
  const [config, setConfig] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadAndValidateConfig = async (configLocation2) => {
      onLoading(true);
      setLoading(true);
      const config2 = await loadConfig(configLocation2).catch((error) => {
        onValidationError(error);
      });
      validateConfig(config2).then((configValidated) => {
        const configWithDefaults = merge({}, defaultConfig, configValidated);
        setConfig(configWithDefaults);
        const accessModel = calculateAccessModel(configWithDefaults);
        ConfigStore.update((s) => {
          s.config = configWithDefaults;
          s.accessModel = accessModel;
        });
        setCssVariables(configValidated.options);
        maybeInjectAnalyticsLibrary(config2);
        onLoading(false);
        setLoading(false);
        onValidationCompleted(config2);
      }).catch((error) => {
        onValidationError(error);
        onLoading(false);
        setLoading(false);
      });
    };
    loadAndValidateConfig(configLocation);
  }, [configLocation, onLoading, onValidationError, onValidationCompleted]);
  const setCssVariables = ({backgroundColor, highlightColor, headerBackground}) => {
    const root = document.querySelector(":root");
    if (root && backgroundColor) {
      root.style.setProperty("--body-background-color", backgroundColor);
      root.style.setProperty("--background-contrast-color", calculateContrastColor(backgroundColor));
    }
    if (root && highlightColor) {
      root.style.setProperty("--highlight-color", highlightColor);
      root.style.setProperty("--highlight-contrast-color", calculateContrastColor(highlightColor));
    }
    if (root && headerBackground) {
      root.style.setProperty("--header-background", headerBackground);
      root.style.setProperty("--header-contrast-color", calculateContrastColor(headerBackground));
    }
  };
  const maybeInjectAnalyticsLibrary = (config2) => {
    if (!config2.analyticsToken)
      return;
    return addScript("/jwpltx.js");
  };
  const calculateAccessModel = (config2) => {
    if (!config2.cleengId)
      return "AVOD";
    if (!config2.json?.cleengMonthlyOffer && !config2.json?.cleengYearlyOffer)
      return "AUTHVOD";
    return "SVOD";
  };
  return /* @__PURE__ */ React.createElement(ConfigContext.Provider, {
    value: config
  }, loading ? /* @__PURE__ */ React.createElement(LoadingOverlay, null) : null, children);
};
export default ConfigProvider;
