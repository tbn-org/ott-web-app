import React, {useEffect, useRef, useState} from "../../../_snowpack/pkg/react.js";
import ReactDOM from "../../../_snowpack/pkg/react-dom.js";
import scrollbarSize from "../../utils/dom.js";
import Fade from "../Animation/Fade/Fade.js";
import Grow from "../Animation/Grow/Grow.js";
import styles from "./Modal.module.css.proxy.js";
const Modal = ({open, onClose, children, AnimationComponent = Grow}) => {
  const [visible, setVisible] = useState(open);
  const lastFocus = useRef();
  const modalRef = useRef();
  const keyDownEventHandler = (event) => {
    if (event.key === "Escape" && onClose) {
      onClose();
    }
  };
  useEffect(() => {
    const activeElement = document.activeElement;
    const appView = document.querySelector("#root");
    if (open) {
      if (activeElement) {
        lastFocus.current = activeElement;
      }
      setVisible(true);
      if (appView) {
        appView.inert = true;
        appView.setAttribute("aria-hidden", "true");
      }
      document.body.style.marginRight = `${scrollbarSize()}px`;
      document.body.style.overflowY = "hidden";
      if (modalRef.current) {
        const interactiveElement = modalRef.current.querySelectorAll('a, button, [tabindex="0"]')[0];
        if (interactiveElement)
          interactiveElement.focus();
      }
    } else {
      if (appView) {
        appView.inert = false;
        appView.removeAttribute("aria-hidden");
      }
      document.body.style.removeProperty("margin-right");
      document.body.style.removeProperty("overflow-y");
      if (lastFocus.current) {
        lastFocus.current.focus();
      }
    }
  }, [open]);
  if (!open && !visible)
    return null;
  return ReactDOM.createPortal(/* @__PURE__ */ React.createElement(Fade, {
    open,
    duration: 300,
    onCloseAnimationEnd: () => setVisible(false)
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.modal,
    onKeyDown: keyDownEventHandler,
    ref: modalRef
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.backdrop,
    onClick: onClose,
    "data-testid": "backdrop"
  }), /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement(AnimationComponent, {
    open,
    duration: 200
  }, children)))), document.querySelector("body"));
};
export default Modal;
