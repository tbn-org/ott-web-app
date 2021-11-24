import React from "../../../../_snowpack/pkg/react.js";
import Animation from "../Animation.js";
const Fade = ({open = true, duration = 250, delay = 0, onOpenAnimationEnd, onCloseAnimationEnd, children}) => {
  const seconds = duration / 1e3;
  const transition = `opacity ${seconds}s ease-in-out`;
  const createStyle = (status) => ({transition, opacity: status === "opening" || status === "open" ? 1 : 0});
  return /* @__PURE__ */ React.createElement(Animation, {
    createStyle: (status) => createStyle(status),
    open,
    duration,
    delay,
    onOpenAnimationEnd,
    onCloseAnimationEnd
  }, children);
};
export default Fade;
