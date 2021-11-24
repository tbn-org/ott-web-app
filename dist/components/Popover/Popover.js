import React from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import DetectOutsideClick from "../DetectOutsideClick/DetectOutsideClick.js";
import Slide from "../Animation/Slide/Slide.js";
import styles from "./Popover.module.css.proxy.js";
const Popover = ({children, isOpen, onClose}) => {
  return /* @__PURE__ */ React.createElement(Slide, {
    open: isOpen,
    duration: 250,
    direction: "right"
  }, /* @__PURE__ */ React.createElement(DetectOutsideClick, {
    callback: onClose
  }, /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.popover)
  }, children)));
};
export default Popover;
