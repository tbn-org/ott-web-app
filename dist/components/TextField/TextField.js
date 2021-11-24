import React from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import useOpaqueId from "../../hooks/useOpaqueId.js";
import styles from "./TextField.module.css.proxy.js";
const TextField = ({
  className,
  label,
  error,
  helperText,
  multiline,
  leftControl,
  rightControl,
  type = "text",
  rows = 3,
  editing = true,
  value,
  ...rest
}) => {
  const id = useOpaqueId("text-field", rest.name);
  const {t} = useTranslation("common");
  const InputComponent = multiline ? "textarea" : "input";
  const textFieldClassName = classNames(styles.textField, {
    [styles.error]: error,
    [styles.disabled]: rest.disabled,
    [styles.leftControl]: !!leftControl,
    [styles.rightControl]: !!rightControl
  }, className);
  const inputProps = {
    id,
    type,
    value,
    ...rest
  };
  if (multiline) {
    inputProps.rows = rows;
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: textFieldClassName
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: id,
    className: styles.label
  }, label, !rest.required && editing ? /* @__PURE__ */ React.createElement("span", null, t("optional")) : null), editing ? /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, leftControl ? /* @__PURE__ */ React.createElement("div", {
    className: styles.control
  }, leftControl) : null, /* @__PURE__ */ React.createElement(InputComponent, {
    className: styles.input,
    ...inputProps
  }), rightControl ? /* @__PURE__ */ React.createElement("div", {
    className: styles.control
  }, rightControl) : null) : /* @__PURE__ */ React.createElement("p", null, value), helperText ? /* @__PURE__ */ React.createElement("div", {
    className: styles.helperText
  }, helperText) : null);
};
export default TextField;
