import React from "../../../_snowpack/pkg/react.js";
import {Grid, WindowScroller, AutoSizer} from "../../../_snowpack/pkg/react-virtualized.js";
import scrollbarSize from "../../utils/domHelpers.js";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import styles from "./VirtualizedGrid.module.css.proxy.js";
const calculateHeight = (width, rat1 = 16, rat2 = 9) => {
  const ratio = width / rat1;
  return ratio * rat2;
};
const VirtualizedGrid = ({cellRenderer, rowCount, cols, spacing}) => {
  const breakpoint = useBreakpoint();
  const columnCount = cols[breakpoint];
  return /* @__PURE__ */ React.createElement(WindowScroller, null, ({height, isScrolling, onChildScroll, scrollTop}) => /* @__PURE__ */ React.createElement(AutoSizer, {
    disableHeight: true
  }, ({width}) => /* @__PURE__ */ React.createElement(Grid, {
    role: "grid",
    className: styles.grid,
    tabIndex: -1,
    autoHeight: true,
    cellRenderer,
    onScroll: onChildScroll,
    isScrolling,
    scrollTop,
    columnCount,
    columnWidth: width / columnCount,
    height,
    rowCount,
    rowHeight: calculateHeight(width / columnCount) + spacing,
    width,
    getScrollbarSize: scrollbarSize
  })));
};
export default VirtualizedGrid;
