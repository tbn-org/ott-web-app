import {BrowserRouter as Router} from "../_snowpack/pkg/react-router-dom.js";
import React from "../_snowpack/pkg/react.js";
import {render} from "../_snowpack/pkg/@testing-library/react.js";
import QueryProvider from "./providers/QueryProvider.js";
export const wrapper = ({children}) => /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(QueryProvider, null, children));
const customRender = (ui, options) => render(ui, {wrapper, ...options});
export const mockWindowLocation = (path) => {
  Object.defineProperty(window, "location", {
    value: {
      pathname: path,
      assign: jest.fn()
    }
  });
};
export const mockMatchMedia = () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }))
  });
};
export {customRender as render};
