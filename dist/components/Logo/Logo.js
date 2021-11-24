import React, {useState} from "../../../_snowpack/pkg/react.js";
import {Link} from "../../../_snowpack/pkg/react-router-dom.js";
import styles from "./Logo.module.css.proxy.js";
const Logo = ({src, onLoad}) => {
  const [imgDimensions, updateImgDimensions] = useState({height: void 0, width: void 0});
  const onLoadHandler = (event) => {
    const {height, width} = event.currentTarget;
    updateImgDimensions({height, width});
    onLoad();
  };
  return /* @__PURE__ */ React.createElement(Link, {
    to: "/"
  }, /* @__PURE__ */ React.createElement("img", {
    className: styles.logo,
    alt: "logo",
    src,
    height: imgDimensions.height,
    width: imgDimensions.width,
    onLoad: onLoadHandler,
    onError: onLoad
  }));
};
export default Logo;
