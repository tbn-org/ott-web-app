import React, {useEffect, useRef} from "../../../_snowpack/pkg/react.js";
const DetectOutsideClick = ({callback, children}) => {
  const elementRef = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (!elementRef.current || !(event.target instanceof Node)) {
        return;
      }
      if (elementRef.current !== event.target && !elementRef.current?.contains(event.target)) {
        callback();
      }
    };
    setTimeout(() => document.addEventListener("click", handleClick), 1);
    return () => document.removeEventListener("click", handleClick);
  }, [callback]);
  return React.cloneElement(children, {
    ref: (node) => {
      elementRef.current = node;
    }
  });
};
export default DetectOutsideClick;
