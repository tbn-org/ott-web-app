import React, {Fragment} from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import IconButton from "../IconButton/IconButton.js";
import Close from "../../icons/Close.js";
import styles from "./Sidebar.module.css.proxy.js";
const Sidebar = ({isOpen, onClose, children}) => {
  const {t} = useTranslation("menu");
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.backdrop, {
      [styles.visible]: isOpen
    }),
    onClick: onClose
  }), /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.sidebar, {
      [styles.open]: isOpen
    })
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.heading
  }, /* @__PURE__ */ React.createElement(IconButton, {
    onClick: onClose,
    "aria-label": t("close_menu"),
    tabIndex: isOpen ? 0 : -1
  }, /* @__PURE__ */ React.createElement(Close, null))), /* @__PURE__ */ React.createElement("nav", {
    className: styles.group,
    onClick: onClose
  }, children)));
};
export default Sidebar;
