import React, {useState, useEffect, useRef} from "../../../_snowpack/pkg/react.js";
const Animation = ({
  createStyle,
  open = true,
  duration = 250,
  delay = 0,
  onOpenAnimationEnd,
  onCloseAnimationEnd,
  children
}) => {
  const [status, setStatus] = useState("closed");
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const seconds = duration / 1e3;
  const transition = `transform ${seconds}s ease-out`;
  const timeout = useRef();
  const timeout2 = useRef();
  useEffect(() => {
    if (timeout.current)
      clearTimeout(timeout.current);
    if (timeout2.current)
      clearTimeout(timeout2.current);
    if (open) {
      setHasOpenedBefore(true);
      timeout.current = window.setTimeout(() => setStatus("opening"), delay);
      timeout2.current = window.setTimeout(() => {
        setStatus("open");
        onOpenAnimationEnd && onOpenAnimationEnd();
      }, duration + delay);
    } else if (hasOpenedBefore) {
      timeout.current = window.setTimeout(() => setStatus("closing"), delay);
      timeout2.current = window.setTimeout(() => {
        setStatus("closed");
        onCloseAnimationEnd && onCloseAnimationEnd();
      }, duration + delay);
    }
    return () => {
      clearTimeout(timeout.current);
      clearTimeout(timeout2.current);
    };
  }, [duration, delay, transition, open, onOpenAnimationEnd, onCloseAnimationEnd, hasOpenedBefore, setHasOpenedBefore]);
  if (!open && status === "closed") {
    return null;
  }
  return /* @__PURE__ */ React.createElement("div", {
    style: createStyle(status)
  }, children);
};
export default Animation;
