import React from "../../_snowpack/pkg/react.js";
import classNames from "../../_snowpack/pkg/classnames.js";
import styles from "./Icon.module.css.proxy.js";
export default (viewBox, icon) => ({className, ...props}) => /* @__PURE__ */ React.createElement("svg", {
  className: classNames(styles.icon, className),
  viewBox,
  ...props,
  focusable: "false",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg"
}, icon);
