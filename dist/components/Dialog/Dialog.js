import React from "../../../_snowpack/pkg/react.js";
import Modal from "../Modal/Modal.js";
import Slide from "../Animation/Slide/Slide.js";
import ModalCloseButton from "../ModalCloseButton/ModalCloseButton.js";
import styles from "./Dialog.module.css.proxy.js";
const Dialog = ({open, onClose, children}) => {
  return /* @__PURE__ */ React.createElement(Modal, {
    open,
    onClose,
    AnimationComponent: Slide
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.dialog
  }, /* @__PURE__ */ React.createElement(ModalCloseButton, {
    onClick: onClose
  }), children));
};
export default Dialog;
