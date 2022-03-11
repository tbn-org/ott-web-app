import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import React from "../_snowpack/pkg/react.js";
import ReactDOM from "../_snowpack/pkg/react-dom.js";
import "../_snowpack/pkg/wicg-inert.js";
import registerServiceWorker from "./registerServiceWorker.js";
import App from "./App.js";
if (typeof NODE_ENV_COMPILE_CONST === "undefined" || NODE_ENV_COMPILE_CONST !== "production") {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const configFile = urlSearchParams.get("c") || window.sessionStorage.getItem("config-file-override");
  if (configFile) {
    window.sessionStorage.setItem("config-file-override", configFile);
  }
  window.configLocation = configFile ? `/test-data/config.${configFile}.json` : "/config.json";
}
ReactDOM.render(/* @__PURE__ */ React.createElement(App, null), document.getElementById("root"));
registerServiceWorker();
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}
