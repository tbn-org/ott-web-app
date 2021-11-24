import React from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import styles from "./FormFeedback.module.css.proxy.js";
const FormFeedback = ({children, variant = "error"}) => {
  const className = classNames(styles.formFeedback, {
    [styles.error]: variant === "error",
    [styles.warning]: variant === "warning",
    [styles.success]: variant === "success"
  });
  return /* @__PURE__ */ React.createElement("div", {
    className
  }, children);
};
export default FormFeedback;
