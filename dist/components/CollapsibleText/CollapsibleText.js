import classNames from "../../../_snowpack/pkg/classnames.js";
import React, {useEffect, useRef, useState} from "../../../_snowpack/pkg/react.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import IconButton from "../IconButton/IconButton.js";
import ChevronRight from "../../icons/ChevronRight.js";
import styles from "./CollapsibleText.module.css.proxy.js";
const CollapsibleText = ({text, className, maxHeight = "none"}) => {
  const divRef = useRef();
  const breakpoint = useBreakpoint();
  const [doesFlowOver, setDoesFlowOver] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ariaLabel = expanded ? "Collapse" : "Expand";
  const clippablePixels = 4;
  useEffect(() => {
    divRef.current && setDoesFlowOver(divRef.current.scrollHeight > divRef.current.offsetHeight + clippablePixels || maxHeight < divRef.current.offsetHeight && maxHeight !== "none");
  }, [maxHeight, text, breakpoint]);
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.collapsibleText)
  }, /* @__PURE__ */ React.createElement("div", {
    ref: divRef,
    className: classNames(styles.textContainer, className, {[styles.collapsed]: !expanded && doesFlowOver}),
    style: {maxHeight: expanded ? divRef.current.scrollHeight : maxHeight}
  }, text), doesFlowOver && /* @__PURE__ */ React.createElement(IconButton, {
    "aria-label": ariaLabel,
    className: classNames(styles.chevron, {[styles.expanded]: expanded}),
    onClick: () => setExpanded(!expanded)
  }, /* @__PURE__ */ React.createElement(ChevronRight, null)));
};
export default CollapsibleText;
