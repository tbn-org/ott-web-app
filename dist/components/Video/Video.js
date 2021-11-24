import React, {useState, useEffect, useCallback} from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import CollapsibleText from "../CollapsibleText/CollapsibleText.js";
import Cinema from "../../containers/Cinema/Cinema.js";
import useBreakpoint, {Breakpoint} from "../../hooks/useBreakpoint.js";
import Favorite from "../../icons/Favorite.js";
import PlayTrailer from "../../icons/PlayTrailer.js";
import Share from "../../icons/Share.js";
import Check from "../../icons/Check.js";
import ArrowLeft from "../../icons/ArrowLeft.js";
import Play from "../../icons/Play.js";
import Button from "../Button/Button.js";
import IconButton from "../IconButton/IconButton.js";
import {formatDuration} from "../../utils/formatting.js";
import Modal from "../Modal/Modal.js";
import FavoriteBorder from "../../icons/FavoriteBorder.js";
import Fade from "../Animation/Fade/Fade.js";
import ModalCloseButton from "../ModalCloseButton/ModalCloseButton.js";
import styles from "./Video.module.css.proxy.js";
const Video = ({
  title,
  item,
  feedId,
  trailerItem,
  play,
  allowedToWatch,
  startWatchingLabel,
  onStartWatchingClick,
  progress,
  goBack,
  onComplete,
  poster,
  enableSharing,
  hasShared,
  onShareClick,
  isFavorited,
  onFavoriteButtonClick,
  children,
  playTrailer,
  onTrailerClick,
  onTrailerClose,
  isSeries = false,
  episodeCount
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const breakpoint = useBreakpoint();
  const {t} = useTranslation(["video", "common"]);
  const handleUserActive = useCallback(() => setUserActive(true), []);
  const handleUserInactive = useCallback(() => setUserActive(false), []);
  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
  const handleComplete = useCallback(() => onComplete && onComplete(), [onComplete]);
  const isLargeScreen = breakpoint >= Breakpoint.md;
  const isMobile = breakpoint === Breakpoint.xs;
  const imageSourceWidth = 640 * (window.devicePixelRatio > 1 || isLargeScreen ? 2 : 1);
  const posterImage = item.image.replace("720", imageSourceWidth.toString());
  const metaData = [];
  if (item.pubdate)
    metaData.push(new Date(item.pubdate * 1e3).getFullYear());
  if (!isSeries && item.duration)
    metaData.push(formatDuration(item.duration));
  if (isSeries && episodeCount)
    metaData.push(t("video:total_episodes", {count: episodeCount}));
  if (item.genre)
    metaData.push(item.genre);
  if (item.rating)
    metaData.push(item.rating);
  const metaString = metaData.join(" • ");
  const seriesMeta = isSeries && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("strong", null, `S${item.seasonNumber}:E${item.episodeNumber}`), " - ", item.title);
  useEffect(() => {
    if (play || playTrailer)
      setUserActive(true);
  }, [play, playTrailer]);
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.video
  }, /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.main, styles.mainPadding, {
      [styles.posterNormal]: poster === "normal"
    })
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.info
  }, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, title), /* @__PURE__ */ React.createElement("div", {
    className: styles.metaContainer
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.meta
  }, metaString), isSeries && /* @__PURE__ */ React.createElement("div", {
    className: styles.seriesMeta
  }, seriesMeta)), /* @__PURE__ */ React.createElement(CollapsibleText, {
    text: item.description,
    className: styles.description,
    maxHeight: isMobile ? 60 : "none"
  }), /* @__PURE__ */ React.createElement("div", {
    className: styles.buttonBar
  }, /* @__PURE__ */ React.createElement(Button, {
    className: styles.bigButton,
    color: "primary",
    variant: "contained",
    size: "large",
    label: startWatchingLabel,
    startIcon: allowedToWatch ? /* @__PURE__ */ React.createElement(Play, null) : void 0,
    onClick: onStartWatchingClick,
    active: play,
    fullWidth: breakpoint < Breakpoint.md
  }, progress ? /* @__PURE__ */ React.createElement("div", {
    className: styles.progressRail
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.progress,
    style: {width: `${progress * 100}%`}
  })) : null), trailerItem && /* @__PURE__ */ React.createElement(Button, {
    className: styles.bigButton,
    label: t("video:trailer"),
    "aria-label": t("video:watch_trailer"),
    startIcon: /* @__PURE__ */ React.createElement(PlayTrailer, null),
    onClick: onTrailerClick,
    active: playTrailer,
    fullWidth: breakpoint < Breakpoint.md
  }), /* @__PURE__ */ React.createElement(Button, {
    label: t("video:favorite"),
    "aria-label": isFavorited ? t("video:remove_from_favorites") : t("video:add_to_favorites"),
    startIcon: isFavorited ? /* @__PURE__ */ React.createElement(Favorite, null) : /* @__PURE__ */ React.createElement(FavoriteBorder, null),
    onClick: onFavoriteButtonClick,
    color: isFavorited ? "primary" : "default",
    fullWidth: breakpoint < Breakpoint.md
  }), enableSharing && /* @__PURE__ */ React.createElement(Button, {
    label: hasShared ? t("video:copied_url") : t("video:share"),
    startIcon: hasShared ? /* @__PURE__ */ React.createElement(Check, null) : /* @__PURE__ */ React.createElement(Share, null),
    onClick: onShareClick,
    active: hasShared,
    fullWidth: breakpoint < Breakpoint.md
  }))), /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.poster, styles[poster]),
    style: {backgroundImage: `url('${posterImage}')`}
  })), !!children && /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.related, styles.mainPadding)
  }, children), /* @__PURE__ */ React.createElement(Fade, {
    open: play
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.playerContainer
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.player
  }, /* @__PURE__ */ React.createElement(Cinema, {
    item,
    feedId,
    onPlay: handlePlay,
    onPause: handlePause,
    onComplete: handleComplete,
    onUserActive: handleUserActive,
    onUserInActive: handleUserInactive
  })), /* @__PURE__ */ React.createElement(Fade, {
    open: !isPlaying || userActive
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.playerOverlay
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.playerContent
  }, /* @__PURE__ */ React.createElement(IconButton, {
    "aria-label": t("common:back"),
    onClick: goBack,
    className: styles.backButton
  }, /* @__PURE__ */ React.createElement(ArrowLeft, null)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, title), /* @__PURE__ */ React.createElement("div", {
    className: styles.metaContainer
  }, isSeries && /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.seriesMeta, styles.seriesMetaPlayer)
  }, seriesMeta), /* @__PURE__ */ React.createElement("div", {
    className: styles.meta
  }, metaString)))))))), !!trailerItem && /* @__PURE__ */ React.createElement(Modal, {
    open: playTrailer,
    onClose: onTrailerClose
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.trailerModal
  }, /* @__PURE__ */ React.createElement(Cinema, {
    item: trailerItem,
    onPlay: handlePlay,
    onPause: handlePause,
    onComplete: onTrailerClose,
    onUserActive: handleUserActive,
    onUserInActive: handleUserInactive,
    isTrailer: true
  }), /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.playerOverlay, {[styles.hidden]: isPlaying && !userActive})
  }), /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.trailerMeta, styles.title, {[styles.hidden]: isPlaying && !userActive})
  }, `${title} - Trailer`), /* @__PURE__ */ React.createElement(ModalCloseButton, {
    onClick: onTrailerClose,
    visible: !isPlaying || userActive
  }))));
};
export default Video;
