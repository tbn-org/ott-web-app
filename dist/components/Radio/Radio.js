import React from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import useOpaqueId from "../../hooks/useOpaqueId.js";
import styles from "./Radio.module.css.proxy.js";
const Radio = ({name, onChange, header, value, values, helperText, error, required}) => {
  const {t} = useTranslation("common");
  const id = useOpaqueId("radio", name);
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.container, {[styles.error]: error})
  }, header ? /* @__PURE__ */ React.createElement("div", {
    className: styles.header
  }, header, !required ? /* @__PURE__ */ React.createElement("span", null, t("optional")) : null) : null, values?.map((optionValue, index) => /* @__PURE__ */ React.createElement("div", {
    className: styles.radio,
    key: index
  }, /* @__PURE__ */ React.createElement("input", {
    value: optionValue,
    name,
    type: "radio",
    id: id + index,
    onChange,
    checked: value === optionValue,
    required
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: id + index
  }, optionValue))), helperText ? /* @__PURE__ */ React.createElement("div", {
    className: styles.helperText
  }, helperText) : null);
};
export default Radio;
