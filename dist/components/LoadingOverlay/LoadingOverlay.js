import React from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import Spinner from "../Spinner/Spinner.js";
import styles from "./LoadingOverlay.module.css.proxy.js";
const LoadingOverlay = ({transparentBackground = false, inline = false}) => {
  const className = classNames(styles.loadingOverlay, {
    [styles.transparent]: transparentBackground,
    [styles.fixed]: !inline,
    [styles.inline]: inline
  });
  return /* @__PURE__ */ React.createElement("div", {
    className
  }, /* @__PURE__ */ React.createElement(Spinner, null));
};
export default LoadingOverlay;
