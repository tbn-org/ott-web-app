import React, {useCallback, useState} from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Card from "../Card/Card.js";
import TileDock from "../TileDock/TileDock.js";
import useBreakpoint, {Breakpoint} from "../../hooks/useBreakpoint.js";
import ChevronLeft from "../../icons/ChevronLeft.js";
import ChevronRight from "../../icons/ChevronRight.js";
import {findPlaylistImageForWidth} from "../../utils/collection.js";
import {isAllowedToWatch} from "../../utils/cleeng.js";
import styles from "./Shelf.module.css.proxy.js";
export const tileBreakpoints = {
  [Breakpoint.xs]: 1,
  [Breakpoint.sm]: 2,
  [Breakpoint.md]: 3,
  [Breakpoint.lg]: 4,
  [Breakpoint.xl]: 5
};
export const featuredTileBreakpoints = {
  [Breakpoint.xs]: 1,
  [Breakpoint.sm]: 1,
  [Breakpoint.md]: 1,
  [Breakpoint.lg]: 1,
  [Breakpoint.xl]: 1
};
const Shelf = ({
  playlist,
  onCardClick,
  onCardHover,
  title,
  watchHistory,
  enableTitle = true,
  enableCardTitles = true,
  featured = false,
  loading = false,
  error = null,
  accessModel,
  isLoggedIn,
  hasSubscription
}) => {
  const breakpoint = useBreakpoint();
  const {t} = useTranslation("common");
  const [didSlideBefore, setDidSlideBefore] = useState(false);
  const tilesToShow = featured ? featuredTileBreakpoints[breakpoint] : tileBreakpoints[breakpoint];
  const isLargeScreen = breakpoint >= Breakpoint.md;
  const imageSourceWidth = (featured ? 640 : 320) * (window.devicePixelRatio > 1 || isLargeScreen ? 2 : 1);
  const renderTile = useCallback((item, isInView) => /* @__PURE__ */ React.createElement(Card, {
    title: item.title,
    enableTitle: enableCardTitles,
    duration: item.duration,
    progress: watchHistory ? watchHistory[item.mediaid] : void 0,
    posterSource: findPlaylistImageForWidth(item, imageSourceWidth),
    seriesId: item.seriesId,
    seasonNumber: item.seasonNumber,
    episodeNumber: item.episodeNumber,
    onClick: isInView ? () => onCardClick(item, playlist.feedid) : void 0,
    onHover: typeof onCardHover === "function" ? () => onCardHover(item) : void 0,
    featured,
    disabled: !isInView,
    loading,
    isLocked: !isAllowedToWatch(accessModel, isLoggedIn, item.requiresSubscription !== "false", hasSubscription)
  }), [
    enableCardTitles,
    featured,
    imageSourceWidth,
    loading,
    onCardClick,
    onCardHover,
    playlist.feedid,
    watchHistory,
    accessModel,
    isLoggedIn,
    hasSubscription
  ]);
  const renderRightControl = useCallback((doSlide) => /* @__PURE__ */ React.createElement("div", {
    className: styles.chevron,
    role: "button",
    tabIndex: 0,
    "aria-label": t("slide_right"),
    onKeyDown: (event) => (event.key === "Enter" || event.key === " ") && handleSlide(doSlide),
    onClick: () => handleSlide(doSlide)
  }, /* @__PURE__ */ React.createElement(ChevronRight, null)), [t]);
  const renderLeftControl = useCallback((doSlide) => /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.chevron, {
      [styles.disabled]: !didSlideBefore
    }),
    role: "button",
    tabIndex: didSlideBefore ? 0 : -1,
    "aria-label": t("slide_left"),
    onKeyDown: (event) => (event.key === "Enter" || event.key === " ") && handleSlide(doSlide),
    onClick: () => handleSlide(doSlide)
  }, /* @__PURE__ */ React.createElement(ChevronLeft, null)), [didSlideBefore, t]);
  const renderPaginationDots = (index, pageIndex) => /* @__PURE__ */ React.createElement("span", {
    key: pageIndex,
    className: classNames(styles.dot, {[styles.active]: index === pageIndex})
  });
  const handleSlide = (doSlide) => {
    setDidSlideBefore(true);
    doSlide();
  };
  if (error || !playlist?.playlist)
    return /* @__PURE__ */ React.createElement("h2", {
      className: styles.error
    }, "Could not load items");
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.shelf, {[styles.featured]: featured}),
    "data-mediaid": playlist.feedid
  }, !featured && enableTitle ? /* @__PURE__ */ React.createElement("h2", {
    className: classNames(styles.title, {[styles.loading]: loading})
  }, title || playlist.title) : null, /* @__PURE__ */ React.createElement(TileDock, {
    items: playlist.playlist,
    tilesToShow,
    wrapWithEmptyTiles: featured && playlist.playlist.length === 1,
    cycleMode: "restart",
    showControls: !matchMedia("(hover: none)").matches && !loading,
    showDots: featured,
    transitionTime: "0.3s",
    spacing: 8,
    renderLeftControl,
    renderRightControl,
    renderPaginationDots,
    renderTile
  }));
};
export default Shelf;
