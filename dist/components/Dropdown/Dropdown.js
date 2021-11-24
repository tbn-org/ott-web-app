import React from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import useOpaqueId from "../../hooks/useOpaqueId.js";
import styles from "./Dropdown.module.css.proxy.js";
const Dropdown = ({
  name,
  value,
  className,
  defaultLabel,
  options,
  onChange,
  optionsStyle,
  label,
  fullWidth,
  valuePrefix,
  error,
  helperText,
  required = false,
  size = "medium",
  ...rest
}) => {
  const {t} = useTranslation("common");
  const id = useOpaqueId();
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.container, {[styles.fullWidth]: fullWidth, [styles.error]: error}, styles[size], className)
  }, label && /* @__PURE__ */ React.createElement("label", {
    htmlFor: id,
    className: styles.label
  }, label, !required ? /* @__PURE__ */ React.createElement("span", null, t("optional")) : null), /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.dropdown, {[styles.fullWidth]: fullWidth})
  }, /* @__PURE__ */ React.createElement("select", {
    id,
    className: styles.select,
    name,
    value,
    onChange,
    "aria-required": required,
    ...rest
  }, defaultLabel && /* @__PURE__ */ React.createElement("option", {
    className: classNames(styles.option, optionsStyle),
    value: "",
    disabled: required
  }, defaultLabel), options && options.map((option) => /* @__PURE__ */ React.createElement("option", {
    className: classNames(styles.option, optionsStyle),
    key: option,
    value: option
  }, valuePrefix, option)))), helperText ? /* @__PURE__ */ React.createElement("div", {
    className: styles.helperText
  }, helperText) : null);
};
export default Dropdown;
