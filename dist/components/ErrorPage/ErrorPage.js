import React from "../../../_snowpack/pkg/react.js";
import styles from "./ErrorPage.module.css.proxy.js";
const ErrorPage = ({title, children}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.errorPage
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.box
  }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("h1", {
    className: styles.title
  }, title)), /* @__PURE__ */ React.createElement("main", {
    className: styles.main
  }, children)));
};
export default ErrorPage;
