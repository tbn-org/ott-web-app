import React from "../../../_snowpack/pkg/react.js";
import {NavLink} from "../../../_snowpack/pkg/react-router-dom.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import styles from "./MenuButton.module.css.proxy.js";
const MenuButton = ({label, to, onClick, tabIndex = 0, active = false, startIcon, small = false}) => {
  const icon = startIcon ? /* @__PURE__ */ React.createElement("div", {
    className: styles.startIcon
  }, startIcon) : null;
  if (to) {
    return /* @__PURE__ */ React.createElement(NavLink, {
      className: classNames(styles.menuButton, {[styles.small]: small}),
      onClick,
      activeClassName: styles.active,
      to,
      tabIndex,
      exact: true
    }, icon, /* @__PURE__ */ React.createElement("span", {
      className: styles.label
    }, label));
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.menuButton, {[styles.active]: active}),
    onClick,
    tabIndex
  }, icon, /* @__PURE__ */ React.createElement("span", {
    className: styles.label
  }, label));
};
export default MenuButton;
