import React from "../../../_snowpack/pkg/react.js";
import VirtualizedGrid from "../VirtualizedGrid/VirtualizedGrid.js";
import Card from "../Card/Card.js";
import useBreakpoint, {Breakpoint} from "../../hooks/useBreakpoint.js";
import {chunk, findPlaylistImageForWidth} from "../../utils/collection.js";
import {isAllowedToWatch} from "../../utils/cleeng.js";
import styles from "./CardGrid.module.css.proxy.js";
const defaultCols = {
  [Breakpoint.xs]: 2,
  [Breakpoint.sm]: 2,
  [Breakpoint.md]: 3,
  [Breakpoint.lg]: 4,
  [Breakpoint.xl]: 5
};
function CardGrid({
  playlist,
  onCardClick,
  onCardHover,
  watchHistory,
  enableCardTitles = true,
  isLoading = false,
  cols = defaultCols,
  currentCardItem,
  currentCardLabel,
  accessModel,
  isLoggedIn,
  hasSubscription
}) {
  const breakpoint = useBreakpoint();
  const isLargeScreen = breakpoint >= Breakpoint.md;
  const imageSourceWidth = 320 * (window.devicePixelRatio > 1 || isLargeScreen ? 2 : 1);
  const rows = chunk(playlist, cols[breakpoint]);
  const cellRenderer = ({columnIndex, rowIndex, style}) => {
    if (!rows[rowIndex][columnIndex])
      return;
    const playlistItem = rows[rowIndex][columnIndex];
    const {mediaid, title, duration, seriesId, episodeNumber, seasonNumber} = playlistItem;
    return /* @__PURE__ */ React.createElement("div", {
      className: styles.cell,
      style,
      key: mediaid,
      role: "row"
    }, /* @__PURE__ */ React.createElement("div", {
      role: "cell"
    }, /* @__PURE__ */ React.createElement(Card, {
      key: mediaid,
      title,
      enableTitle: enableCardTitles,
      duration,
      posterSource: findPlaylistImageForWidth(playlistItem, imageSourceWidth),
      progress: watchHistory ? watchHistory[mediaid] : void 0,
      seriesId,
      episodeNumber,
      seasonNumber,
      onClick: () => onCardClick(playlistItem, playlistItem.feedid),
      onHover: typeof onCardHover === "function" ? () => onCardHover(playlistItem) : void 0,
      loading: isLoading,
      isCurrent: currentCardItem && currentCardItem.mediaid === mediaid,
      currentLabel: currentCardLabel,
      isLocked: !isAllowedToWatch(accessModel, isLoggedIn, playlistItem.requiresSubscription !== "false", hasSubscription)
    })));
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement(VirtualizedGrid, {
    rowCount: rows.length,
    cols,
    cellRenderer,
    spacing: enableCardTitles ? 50 : 4
  }));
}
export default CardGrid;
