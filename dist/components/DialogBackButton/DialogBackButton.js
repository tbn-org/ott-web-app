import React from "../../../_snowpack/pkg/react.js";
import IconButton from "../IconButton/IconButton.js";
import ArrowLeft from "../../icons/ArrowLeft.js";
import styles from "./DialogBackButton.module.css.proxy.js";
const DialogBackButton = ({onClick}) => {
  return /* @__PURE__ */ React.createElement(IconButton, {
    onClick,
    className: styles.dialogBackButton,
    "aria-label": "Go back"
  }, /* @__PURE__ */ React.createElement(ArrowLeft, null));
};
export default DialogBackButton;
