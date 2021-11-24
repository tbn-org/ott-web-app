import React, {Fragment} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Dropdown from "../Dropdown/Dropdown.js";
import Button from "../Button/Button.js";
import useBreakpoint, {Breakpoint} from "../../hooks/useBreakpoint.js";
import styles from "./Filter.module.css.proxy.js";
const Filter = ({name, value, defaultLabel, options, setValue, valuePrefix = ""}) => {
  const {t} = useTranslation("common");
  const breakpoint = useBreakpoint();
  if (!options.length) {
    return null;
  }
  const handleChange = (event) => setValue(event.target.value);
  const showFilterRow = breakpoint >= Breakpoint.md && options.length < 6;
  return /* @__PURE__ */ React.createElement(Fragment, null, showFilterRow ? /* @__PURE__ */ React.createElement("div", {
    className: styles.filterRow,
    role: "listbox"
  }, options.map((option) => /* @__PURE__ */ React.createElement(Button, {
    label: `${valuePrefix}${option}`,
    onClick: () => setValue(option),
    key: option,
    active: value === option,
    role: "option"
  })), /* @__PURE__ */ React.createElement(Button, {
    label: defaultLabel,
    onClick: () => setValue(""),
    active: value === "",
    key: defaultLabel,
    role: "option"
  })) : /* @__PURE__ */ React.createElement("div", {
    className: styles.filterDropDown
  }, /* @__PURE__ */ React.createElement(Dropdown, {
    className: styles.dropDown,
    size: "small",
    options,
    defaultLabel,
    valuePrefix,
    name,
    value,
    onChange: handleChange,
    "aria-label": t("filter_videos_by_genre")
  })));
};
export default Filter;
