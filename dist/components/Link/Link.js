import React from "../../../_snowpack/pkg/react.js";
import {Link as RouterLink} from "../../../_snowpack/pkg/react-router-dom.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import styles from "./Link.module.css.proxy.js";
const Link = ({to, href, children, className, ...rest}) => {
  const linkClassName = classNames(styles.link, className);
  if (to) {
    return /* @__PURE__ */ React.createElement(RouterLink, {
      to,
      className: linkClassName
    }, children);
  }
  return /* @__PURE__ */ React.createElement("a", {
    href,
    className: linkClassName,
    ...rest
  }, children);
};
export default Link;
