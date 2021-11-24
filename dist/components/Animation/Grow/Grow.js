import React from "../../../../_snowpack/pkg/react.js";
import Animation from "../Animation.js";
const Grow = ({open = true, duration = 250, delay = 0, onOpenAnimationEnd, onCloseAnimationEnd, children}) => {
  const seconds = duration / 1e3;
  const transition = `transform ${seconds}s ease-out`;
  const createStyle = (status) => ({
    transition,
    transform: status === "opening" || status === "open" ? "scale(1)" : "scale(0.7)"
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
export default Grow;
