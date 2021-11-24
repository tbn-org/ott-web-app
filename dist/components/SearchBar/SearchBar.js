import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import IconButton from "../IconButton/IconButton.js";
import SearchIcon from "../../icons/Search.js";
import CancelIcon from "../../icons/Cancel.js";
import styles from "./SearchBar.module.css.proxy.js";
const SearchBar = ({query, onQueryChange, onClearButtonClick, inputRef}) => {
  const {t} = useTranslation("search");
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.searchBar
  }, /* @__PURE__ */ React.createElement(SearchIcon, {
    className: styles.icon
  }), /* @__PURE__ */ React.createElement("input", {
    className: styles.input,
    type: "text",
    value: query,
    onChange: onQueryChange,
    "aria-label": t("search_bar.search_label"),
    placeholder: t("search_bar.search_placeholder"),
    ref: inputRef
  }), query ? /* @__PURE__ */ React.createElement(IconButton, {
    className: styles.clearButton,
    "aria-label": t("search_bar.clear_search_label"),
    onClick: onClearButtonClick
  }, /* @__PURE__ */ React.createElement(CancelIcon, null)) : null);
};
export default SearchBar;
