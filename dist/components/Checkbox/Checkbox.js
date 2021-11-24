import React from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import useOpaqueId from "../../hooks/useOpaqueId.js";
import styles from "./Checkbox.module.css.proxy.js";
const Checkbox = ({label, name, onChange, header, checked, value, helperText, disabled, error, required}) => {
  const {t} = useTranslation("common");
  const id = useOpaqueId("check-box", name);
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.checkbox, {[styles.error]: error})
  }, header ? /* @__PURE__ */ React.createElement("div", {
    className: styles.header
  }, header, !required ? /* @__PURE__ */ React.createElement("span", null, t("optional")) : null) : null, /* @__PURE__ */ React.createElement("div", {
    className: styles.row
  }, /* @__PURE__ */ React.createElement("input", {
    name,
    type: "checkbox",
    id,
    value,
    onChange,
    checked,
    "aria-required": required,
    disabled
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: id
  }, required ? "* " : "", label)), helperText ? /* @__PURE__ */ React.createElement("div", {
    className: styles.helperText
  }, helperText) : null);
};
export default Checkbox;
