import React, {memo, useEffect, useRef, useState} from "../../../_snowpack/pkg/react.js";
import {debounce} from "../../utils/common.js";
import styles from "./DynamicBlur.module.css.proxy.js";
const DynamicBlur = ({url, transitionTime = 1, debounceTime = 350}) => {
  const [currentUrl, setCurrentUrl] = useState();
  const [currentImg, setCurrentImg] = useState();
  const firstImage = useRef();
  const secondImage = useRef();
  const loadImgDebounced = useRef(debounce((url2, currentImg2) => loadImage(url2, currentImg2), debounceTime));
  const loadImage = (url2, currentImg2) => {
    const img = document.createElement("img");
    img.onload = () => {
      if (!firstImage.current || !secondImage.current) {
        return;
      }
      if (currentImg2 !== 1) {
        firstImage.current.style.backgroundImage = `url('${url2}')`;
        firstImage.current.style.opacity = "0.3";
        secondImage.current.style.opacity = "0";
        return setCurrentImg(1);
      } else {
        secondImage.current.style.backgroundImage = `url('${url2}')`;
        firstImage.current.style.opacity = "0";
        secondImage.current.style.opacity = "0.3";
        return setCurrentImg(2);
      }
    };
    img.src = url2;
  };
  useEffect(() => {
    if (url && url !== currentUrl) {
      setCurrentUrl(url);
      loadImgDebounced.current(url, currentImg);
    }
  }, [url, currentUrl, currentImg]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    ref: firstImage,
    style: {transition: `opacity ${transitionTime}s ease-in-out`},
    className: styles.BlurBackground
  }), /* @__PURE__ */ React.createElement("div", {
    ref: secondImage,
    style: {transition: `opacity ${transitionTime}s ease-in-out`},
    className: styles.BlurBackground
  }));
};
export default memo(DynamicBlur);
