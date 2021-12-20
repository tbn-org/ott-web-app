import * as __SNOWPACK_ENV__ from '../../../_snowpack/env.js';

import React from "../../../_snowpack/pkg/react.js";
import {BrowserRouter, HashRouter} from "../../../_snowpack/pkg/react-router-dom.js";
export default function Router(props) {
  if (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_GITHUB_PAGES) {
    return /* @__PURE__ */ React.createElement(HashRouter, {
      ...props
    });
  }
  return /* @__PURE__ */ React.createElement(BrowserRouter, {
    ...props
  });
}
