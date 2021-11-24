import React from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {NavLink} from "../../../_snowpack/pkg/react-router-dom.js";
import styles from "./Button.module.css.proxy.js";
const Button = ({
  label,
  children,
  color = "default",
  startIcon,
  fullWidth = false,
  active = false,
  variant = "outlined",
  size = "medium",
  disabled,
  type,
  to,
  onClick,
  className,
  ...rest
}) => {
  const buttonClassName = classNames(styles.button, className, [styles[color]], [styles[variant]], {
    [styles.active]: active,
    [styles.fullWidth]: fullWidth,
    [styles.large]: size === "large",
    [styles.disabled]: disabled
  });
  const icon = startIcon ? /* @__PURE__ */ React.createElement("div", {
    className: styles.startIcon
  }, startIcon) : null;
  const span = /* @__PURE__ */ React.createElement("span", {
    className: styles.buttonLabel
  }, label);
  return to ? /* @__PURE__ */ React.createElement(NavLink, {
    className: buttonClassName,
    to,
    activeClassName: styles.active,
    ...rest,
    exact: true
  }, icon, span, children) : /* @__PURE__ */ React.createElement("button", {
    className: buttonClassName,
    onClick,
    type,
    disabled,
    "aria-disabled": disabled,
    ...rest
  }, icon, span, children);
};
export default Button;
