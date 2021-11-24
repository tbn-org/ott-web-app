import React, {useState} from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import useOpaqueId from "../../hooks/useOpaqueId.js";
import styles from "./DateField.module.css.proxy.js";
const parseDateString = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};
const DateField = ({className, label, error, helperText, value, onChange, format = "YYYY-MM-DD", ...rest}) => {
  const {t} = useTranslation("common");
  const parsedDate = parseDateString(value);
  const [values, setValues] = useState({
    date: parsedDate?.getDate().toString() || "",
    month: parsedDate ? (parsedDate.getMonth() + 1).toString() : "",
    year: parsedDate?.getFullYear().toString() || ""
  });
  const id = useOpaqueId("text-field", rest.name);
  const DateFieldClassName = classNames(styles.dateField, {
    [styles.error]: error
  }, className);
  const handleFocus = (event) => {
    event.currentTarget.select();
  };
  const handleKeyDown = (event) => {
    if (event.key === "Backspace" && values[event.currentTarget.name] === "") {
      event.currentTarget.previousElementSibling?.focus();
      return event.preventDefault();
    }
    if (!/^[0-9]$/.test(event.key) && event.key !== "Tab" && event.key !== "Backspace") {
      return event.preventDefault();
    }
  };
  const padLeft = (value2) => {
    return value2 > 0 && value2 < 10 ? `0${value2}` : value2.toString();
  };
  const clamp = (value2, min, max) => Math.min(max, Math.max(min, value2));
  const parseBlurValue = (value2, min, max) => {
    const parsed = clamp(parseInt(value2), min, max);
    if (isNaN(parsed))
      return "";
    return value2.length > 0 && parsed < 10 ? padLeft(parsed) : parsed.toString();
  };
  const parseInputValue = (value2, min, max) => {
    const parsed = clamp(parseInt(value2), min, max);
    if (isNaN(parsed))
      return "";
    return value2.length > 1 && parsed < 10 ? padLeft(parsed) : parsed.toString();
  };
  const handleBlur = (event) => {
    const {name, value: value2} = event.target;
    setValues((current) => {
      const date = name === "date" ? parseBlurValue(value2, 1, 31) : current.date;
      const month = name === "month" ? parseBlurValue(value2, 1, 12) : current.month;
      const year = name === "year" ? parseBlurValue(value2, 1900, 2100) : current.year;
      return {date, month, year};
    });
  };
  const handleChange = (event) => {
    const {name, value: value2} = event.target;
    const nextSibling = event.currentTarget?.nextElementSibling;
    const date = name === "date" ? parseInputValue(value2, 0, 31) : values.date;
    const month = name === "month" ? parseInputValue(value2, 0, 12) : values.month;
    const year = name === "year" ? parseInputValue(value2, 0, 2100).slice(0, 4) : values.year;
    setValues({date, month, year});
    if (onChange) {
      onChange(date && month && year ? format.replace("YYYY", year).replace("MM", month).replace("DD", date) : "");
    }
    if (nextSibling && name === "month" && month.length === 2 || name === "date" && date.length === 2) {
      setTimeout(() => nextSibling.focus(), 1);
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: DateFieldClassName
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: id,
    className: styles.label
  }, label, !rest.required ? /* @__PURE__ */ React.createElement("span", null, t("optional")) : null), /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement("input", {
    className: styles.input,
    name: "date",
    placeholder: "dd",
    value: values.date,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    maxLength: 2,
    type: "number",
    id
  }), " / ", /* @__PURE__ */ React.createElement("input", {
    className: styles.input,
    name: "month",
    placeholder: "mm",
    value: values.month,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    maxLength: 2,
    type: "number",
    id
  }), " / ", /* @__PURE__ */ React.createElement("input", {
    className: styles.input,
    name: "year",
    placeholder: "yyyy",
    value: values.year,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    maxLength: 4,
    type: "number",
    id
  })), helperText ? /* @__PURE__ */ React.createElement("div", {
    className: styles.helperText
  }, helperText) : null);
};
export default DateField;
