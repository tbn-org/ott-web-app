import classNames from "../../../_snowpack/pkg/classnames.js";
import React from "../../../_snowpack/pkg/react.js";
import styles from "./Spinner.module.css.proxy.js";
const Spinner = ({size = "medium"}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.buffer, {[styles.small]: size === "small"})
  }, /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement("div", null));
};
export default Spinner;
