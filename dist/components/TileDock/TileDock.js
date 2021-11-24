import classNames from "../../../_snowpack/pkg/classnames.js";
import React, {useCallback, useLayoutEffect, useMemo, useRef, useState} from "../../../_snowpack/pkg/react.js";
import styles from "./TileDock.module.css.proxy.js";
const makeTiles = (originalList, slicedItems) => {
  const itemIndices = [];
  return slicedItems.map((item) => {
    let key = `tile_${originalList.indexOf(item)}`;
    while (itemIndices.includes(key)) {
      key += "_";
    }
    itemIndices.push(key);
    return {item, key};
  });
};
const sliceItems = (items, isMultiPage, index, tilesToShow, cycleMode) => {
  if (!isMultiPage)
    return makeTiles(items, items);
  const sliceFrom = index;
  const sliceTo = index + tilesToShow * 3;
  const cycleModeEndlessCompensation = cycleMode === "endless" ? tilesToShow : 0;
  const listStartClone = items.slice(0, tilesToShow + cycleModeEndlessCompensation + 1);
  const listEndClone = items.slice(0 - (tilesToShow + cycleModeEndlessCompensation + 1));
  const itemsWithClones = [...listEndClone, ...items, ...listStartClone];
  const itemsSlice = itemsWithClones.slice(sliceFrom, sliceTo + 2);
  return makeTiles(items, itemsSlice);
};
const TileDock = ({
  items,
  tilesToShow = 6,
  cycleMode = "endless",
  spacing = 12,
  minimalTouchMovement = 30,
  showControls = true,
  animated = !window.matchMedia("(prefers-reduced-motion)").matches,
  transitionTime = "0.6s",
  wrapWithEmptyTiles = false,
  showDots = false,
  renderTile,
  renderLeftControl,
  renderRightControl,
  renderPaginationDots
}) => {
  const [index, setIndex] = useState(0);
  const [slideToIndex, setSlideToIndex] = useState(0);
  const [transform, setTransform] = useState(-100);
  const [doAnimationReset, setDoAnimationReset] = useState(false);
  const frameRef = useRef();
  const tileWidth = 100 / tilesToShow;
  const isMultiPage = items?.length > tilesToShow;
  const transformWithOffset = isMultiPage ? 100 - tileWidth * (tilesToShow + 1) + transform : wrapWithEmptyTiles ? -100 : 0;
  const pages = items.length / tilesToShow;
  const tileList = useMemo(() => {
    return sliceItems(items, isMultiPage, index, tilesToShow, cycleMode);
  }, [items, isMultiPage, index, tilesToShow, cycleMode]);
  const transitionBasis = isMultiPage && animated ? `transform ${transitionTime} ease` : "";
  const needControls = showControls && isMultiPage;
  const showLeftControl = needControls && !(cycleMode === "stop" && index === 0);
  const showRightControl = needControls && !(cycleMode === "stop" && index === items.length - tilesToShow);
  const slide = useCallback((direction) => {
    const directionFactor = direction === "right" ? 1 : -1;
    let nextIndex = index + tilesToShow * directionFactor;
    if (nextIndex < 0) {
      if (cycleMode === "stop")
        nextIndex = 0;
      if (cycleMode === "restart")
        nextIndex = index === 0 ? 0 - tilesToShow : 0;
    }
    if (nextIndex > items.length - tilesToShow) {
      if (cycleMode === "stop")
        nextIndex = items.length - tilesToShow;
      if (cycleMode === "restart")
        nextIndex = index >= items.length - tilesToShow ? items.length : items.length - tilesToShow;
    }
    const steps = Math.abs(index - nextIndex);
    const movement = steps * tileWidth * (0 - directionFactor);
    setSlideToIndex(nextIndex);
    setTransform(-100 + movement);
    if (!animated)
      setDoAnimationReset(true);
  }, [animated, cycleMode, index, items.length, tileWidth, tilesToShow]);
  const handleTouchStart = useCallback((event) => {
    const touchPosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };
    function handleTouchMove(event2) {
      const newPosition = {
        x: event2.changedTouches[0].clientX,
        y: event2.changedTouches[0].clientY
      };
      const movementX = Math.abs(newPosition.x - touchPosition.x);
      const movementY = Math.abs(newPosition.y - touchPosition.y);
      if (movementX > movementY && movementX > 10) {
        event2.preventDefault();
        event2.stopPropagation();
      }
    }
    function handleTouchEnd(event2) {
      const newPosition = {
        x: event2.changedTouches[0].clientX,
        y: event2.changedTouches[0].clientY
      };
      const movementX = Math.abs(newPosition.x - touchPosition.x);
      const movementY = Math.abs(newPosition.y - touchPosition.y);
      const direction = newPosition.x < touchPosition.x ? "right" : "left";
      if (movementX > minimalTouchMovement && movementX > movementY) {
        slide(direction);
      }
      cleanup();
    }
    function handleTouchCancel() {
      cleanup();
    }
    function cleanup() {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchCancel);
    }
    document.addEventListener("touchmove", handleTouchMove, {passive: false});
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchcancel", handleTouchCancel);
  }, [minimalTouchMovement, slide]);
  useLayoutEffect(() => {
    const resetAnimation = () => {
      let resetIndex = slideToIndex;
      resetIndex = resetIndex >= items.length ? slideToIndex - items.length : resetIndex;
      resetIndex = resetIndex < 0 ? items.length + slideToIndex : resetIndex;
      if (resetIndex !== slideToIndex) {
        setSlideToIndex(resetIndex);
      }
      setIndex(resetIndex);
      if (frameRef.current)
        frameRef.current.style.transition = "none";
      setTransform(-100);
      setTimeout(() => {
        if (frameRef.current)
          frameRef.current.style.transition = transitionBasis;
      }, 0);
      setDoAnimationReset(false);
    };
    if (doAnimationReset)
      resetAnimation();
  }, [doAnimationReset, index, items.length, slideToIndex, tileWidth, tilesToShow, transitionBasis]);
  const handleTransitionEnd = (event) => {
    if (event.target === frameRef.current) {
      setDoAnimationReset(true);
    }
  };
  const ulStyle = {
    transform: `translate3d(${transformWithOffset}%, 0, 0)`,
    WebkitTransform: `translate3d(${transformWithOffset}%, 0, 0)`,
    transition: transitionBasis,
    marginLeft: -spacing / 2,
    marginRight: -spacing / 2
  };
  const slideOffset = index - slideToIndex;
  const paginationDots = () => {
    if (showDots && isMultiPage && !!renderPaginationDots) {
      const length = pages;
      return /* @__PURE__ */ React.createElement("div", {
        className: styles.dots
      }, Array.from({length}, (_, pageIndex) => {
        return renderPaginationDots(index, pageIndex);
      }));
    }
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: styles.tileDock
  }, showLeftControl && !!renderLeftControl && /* @__PURE__ */ React.createElement("div", {
    className: styles.leftControl
  }, renderLeftControl(() => slide("left"))), /* @__PURE__ */ React.createElement("ul", {
    ref: frameRef,
    style: ulStyle,
    onTouchStart: handleTouchStart,
    onTransitionEnd: handleTransitionEnd
  }, wrapWithEmptyTiles ? /* @__PURE__ */ React.createElement("li", {
    className: styles.emptyTile,
    style: {
      width: `${tileWidth}%`,
      paddingLeft: spacing / 2,
      paddingRight: spacing / 2,
      boxSizing: "border-box"
    }
  }) : null, tileList.map((tile, listIndex) => {
    const isInView = !isMultiPage || listIndex > tilesToShow - slideOffset && listIndex < tilesToShow * 2 + 1 - slideOffset;
    return /* @__PURE__ */ React.createElement("li", {
      key: tile.key,
      className: classNames({[styles.notInView]: !isInView}),
      style: {
        width: `${tileWidth}%`,
        paddingLeft: spacing / 2,
        paddingRight: spacing / 2,
        boxSizing: "border-box",
        transition: !isInView ? "opacity .2s ease-in 0s" : ""
      }
    }, renderTile(tile.item, isInView));
  }), wrapWithEmptyTiles ? /* @__PURE__ */ React.createElement("li", {
    className: styles.emptyTile,
    style: {
      width: `${tileWidth}%`,
      paddingLeft: spacing / 2,
      paddingRight: spacing / 2,
      boxSizing: "border-box"
    }
  }) : null), showRightControl && !!renderRightControl && /* @__PURE__ */ React.createElement("div", {
    className: styles.rightControl
  }, renderRightControl(() => slide("right")))), paginationDots());
};
export default TileDock;
