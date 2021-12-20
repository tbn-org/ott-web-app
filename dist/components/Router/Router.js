import * as __SNOWPACK_ENV__ from '../../../_snowpack/env.js';

import React from "../../../_snowpack/pkg/react.js";
import {BrowserRouter, HashRouter} from "../../../_snowpack/pkg/react-router-dom.js";
export default function Router(props) {
  const {
    SNOWPACK_PUBLIC_GITHUB_PAGES,
    SNOWPACK_PUBLIC_GITHUB_PAGES_CUSTOM_DOMAIN
  } = __SNOWPACK_ENV__;
  if (SNOWPACK_PUBLIC_GITHUB_PAGES && !SNOWPACK_PUBLIC_GITHUB_PAGES_CUSTOM_DOMAIN) {
    return /* @__PURE__ */ React.createElement(HashRouter, {
      ...props
    });
  }
  return /* @__PURE__ */ React.createElement(BrowserRouter, {
    ...props
  });
}
