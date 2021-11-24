import classNames from "../../../_snowpack/pkg/classnames.js";
import React from "../../../_snowpack/pkg/react.js";
import styles from "./IconButton.module.css.proxy.js";
const IconButton = ({children, onClick, "aria-label": ariaLabel, tabIndex = 0, className}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.iconButton, className),
    onClick,
    "aria-label": ariaLabel,
    role: "button",
    tabIndex,
    onKeyDown: (event) => (event.key === "Enter" || event.key === " ") && tabIndex >= 0 && onClick && onClick()
  }, children);
};
export default IconButton;
