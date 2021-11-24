import React from "../../../../_snowpack/pkg/react.js";
import Animation from "../Animation.js";
const Slide = ({
  open = true,
  duration = 250,
  delay = 0,
  onOpenAnimationEnd,
  onCloseAnimationEnd,
  children,
  direction = "top"
}) => {
  const seconds = duration / 1e3;
  const transition = `transform ${seconds}s ease, opacity ${seconds}s ease`;
  const directions = {
    left: "translate(-15px, 0)",
    top: "translate(0, -15px)",
    right: "translate(15px, 0)",
    bottom: "translate(0, 15px)"
  };
  const createStyle = (status) => ({
    transition,
    transform: status === "opening" || status === "open" ? "translate(0, 0)" : directions[direction],
    opacity: status === "opening" || status === "open" ? 1 : 0,
    zIndex: 15
  });
  return /* @__PURE__ */ React.createElement(Animation, {
    createStyle: (status) => createStyle(status),
    open,
    duration,
    delay,
    onOpenAnimationEnd,
    onCloseAnimationEnd
  }, children);
};
export default Slide;
