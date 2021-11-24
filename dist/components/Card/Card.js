import React, {memo} from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {formatDurationTag} from "../../utils/formatting.js";
import Lock from "../../icons/Lock.js";
import styles from "./Card.module.css.proxy.js";
function Card({
  onClick,
  onHover,
  title,
  duration,
  posterSource,
  seriesId,
  seasonNumber,
  episodeNumber,
  progress,
  posterAspect = "16:9",
  enableTitle = true,
  featured = false,
  disabled = false,
  loading = false,
  isCurrent = false,
  isLocked = true,
  currentLabel
}) {
  const {t} = useTranslation("common");
  const cardClassName = classNames(styles.card, {
    [styles.featured]: featured,
    [styles.disabled]: disabled
  });
  const posterClassNames = classNames(styles.poster, styles[`aspect${posterAspect.replace(":", "")}`], {
    [styles.current]: isCurrent
  });
  const renderTag = () => {
    if (loading || disabled || !title)
      return null;
    if (seriesId) {
      return /* @__PURE__ */ React.createElement("div", {
        className: styles.tag
      }, "Series");
    } else if (seasonNumber && episodeNumber) {
      return /* @__PURE__ */ React.createElement("div", {
        className: styles.tag
      }, "S", seasonNumber, ":E", episodeNumber);
    } else if (duration) {
      return /* @__PURE__ */ React.createElement("div", {
        className: styles.tag
      }, formatDurationTag(duration));
    } else if (duration === 0) {
      return /* @__PURE__ */ React.createElement("div", {
        className: classNames(styles.tag, styles.live)
      }, t("live"));
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: cardClassName,
    onClick,
    onMouseEnter: onHover,
    tabIndex: disabled ? -1 : 0,
    onKeyDown: (event) => (event.key === "Enter" || event.key === " ") && !disabled && onClick && onClick(),
    role: "button",
    "aria-label": t("play_item", {title})
  }, /* @__PURE__ */ React.createElement("div", {
    className: posterClassNames,
    style: {backgroundImage: posterSource ? `url(${posterSource})` : ""}
  }, isCurrent && /* @__PURE__ */ React.createElement("div", {
    className: styles.currentLabel
  }, currentLabel), !loading && /* @__PURE__ */ React.createElement("div", {
    className: styles.meta
  }, featured && !disabled && enableTitle && /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.title, {[styles.loading]: loading})
  }, title), /* @__PURE__ */ React.createElement("div", {
    className: styles.tags
  }, isLocked && /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.tag, styles.lock),
    "aria-label": t("card_lock")
  }, /* @__PURE__ */ React.createElement(Lock, null)), renderTag())), progress ? /* @__PURE__ */ React.createElement("div", {
    className: styles.progressContainer
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.progressBar,
    style: {width: `${Math.round(progress * 100)}%`}
  })) : null), !featured && !disabled && enableTitle && /* @__PURE__ */ React.createElement("div", {
    className: styles.titleContainer
  }, /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.title, {[styles.loading]: loading})
  }, title)));
}
export default memo(Card);
