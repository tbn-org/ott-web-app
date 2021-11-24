import React from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Close from "../../icons/Close.js";
import IconButton from "../IconButton/IconButton.js";
import styles from "./ModalCloseButton.module.css.proxy.js";
const ModalCloseButton = ({onClick, visible = true}) => {
  const {t} = useTranslation("common");
  return /* @__PURE__ */ React.createElement(IconButton, {
    onClick,
    "aria-label": t("close_modal"),
    className: classNames(styles.modalCloseButton, {[styles.hidden]: !visible})
  }, /* @__PURE__ */ React.createElement(Close, null));
};
export default ModalCloseButton;
