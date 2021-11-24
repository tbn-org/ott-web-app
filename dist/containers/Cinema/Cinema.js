import React, {useCallback, useContext, useEffect, useRef, useState} from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {VideoProgressMinMax} from "../../config.js";
import {useWatchHistoryListener} from "../../hooks/useWatchHistoryListener.js";
import {watchHistoryStore, useWatchHistory} from "../../stores/WatchHistoryStore.js";
import {ConfigContext} from "../../providers/ConfigProvider.js";
import {addScript} from "../../utils/dom.js";
import useOttAnalytics from "../../hooks/useOttAnalytics.js";
import {deepCopy} from "../../utils/collection.js";
import styles from "./Cinema.module.css.proxy.js";
const Cinema = ({item, onPlay, onPause, onComplete, onUserActive, onUserInActive, feedId, isTrailer = false}) => {
  const config = useContext(ConfigContext);
  const playerElementRef = useRef(null);
  const playerRef = useRef();
  const loadingRef = useRef(false);
  const seekToRef = useRef(-1);
  const [libLoaded, setLibLoaded] = useState(!!window.jwplayer);
  const scriptUrl = `https://content.jwplatform.com/libraries/${config.player}.js`;
  const enableWatchHistory = config.options.enableContinueWatching && !isTrailer;
  const setPlayer = useOttAnalytics(item, feedId);
  const getProgress = () => {
    if (!playerRef.current)
      return null;
    const duration = playerRef.current.getDuration();
    const progress = playerRef.current.getPosition() / duration;
    return {duration, progress};
  };
  const {saveItem} = useWatchHistory();
  useWatchHistoryListener(() => enableWatchHistory ? saveItem(item, getProgress) : null);
  const handlePlay = useCallback(() => onPlay && onPlay(), [onPlay]);
  const handlePause = useCallback(() => {
    enableWatchHistory && saveItem(item, getProgress);
    onPause && onPause();
  }, [enableWatchHistory, item, onPause, saveItem]);
  const handleComplete = useCallback(() => {
    enableWatchHistory && saveItem(item, getProgress);
    onComplete && onComplete();
  }, [enableWatchHistory, item, onComplete, saveItem]);
  const handleUserActive = useCallback(() => onUserActive && onUserActive(), [onUserActive]);
  const handleUserInactive = useCallback(() => onUserInActive && onUserInActive(), [onUserInActive]);
  useEffect(() => {
    if (!playerRef.current)
      return;
    playerRef.current.on("complete", handleComplete);
    playerRef.current.on("play", handlePlay);
    playerRef.current.on("pause", handlePause);
    playerRef.current.on("userActive", handleUserActive);
    playerRef.current.on("userInactive", handleUserInactive);
    return () => {
      playerRef.current?.off("complete", handleComplete);
      playerRef.current?.off("play", handlePlay);
      playerRef.current?.off("pause", handlePause);
      playerRef.current?.off("userActive", handleUserActive);
      playerRef.current?.off("userInactive", handleUserInactive);
    };
  }, [handleComplete, handlePause, handlePlay, handleUserActive, handleUserInactive]);
  useEffect(() => {
    if (!window.jwplayer && !loadingRef.current) {
      loadingRef.current = true;
      addScript(scriptUrl).then(() => {
        setLibLoaded(true);
        loadingRef.current = false;
      });
    }
  }, [scriptUrl]);
  useEffect(() => {
    if (!config.player) {
      return;
    }
    const calculateWatchHistoryProgress = () => {
      const {watchHistory} = watchHistoryStore.getRawState();
      const watchHistoryItem = watchHistory.find(({mediaid}) => mediaid === item.mediaid);
      if (watchHistoryItem && enableWatchHistory && watchHistoryItem.progress > VideoProgressMinMax.Min && watchHistoryItem.progress < VideoProgressMinMax.Max) {
        seekToRef.current = watchHistoryItem.progress * watchHistoryItem.duration;
      } else {
        seekToRef.current = -1;
      }
    };
    const loadPlaylist = () => {
      if (!item || !playerRef.current) {
        return;
      }
      const currentItem = playerRef.current?.getPlaylistItem();
      if (currentItem && currentItem.mediaid === item.mediaid) {
        return;
      }
      playerRef.current.setConfig({playlist: [deepCopy(item)], autostart: true});
      calculateWatchHistoryProgress();
    };
    const initializePlayer = () => {
      if (!window.jwplayer || !playerElementRef.current)
        return;
      playerRef.current = window.jwplayer(playerElementRef.current);
      playerRef.current.setup({
        playlist: [deepCopy(item)],
        aspect: false,
        width: "100%",
        height: "100%",
        mute: false,
        autostart: true
      });
      calculateWatchHistoryProgress();
      setPlayer(playerRef.current);
      const handleBeforePlay = () => {
        if (seekToRef.current > 0) {
          playerRef.current?.seek(seekToRef.current);
          seekToRef.current = -1;
        }
      };
      playerRef.current.on("beforePlay", handleBeforePlay);
    };
    if (playerRef.current) {
      return loadPlaylist();
    }
    if (libLoaded) {
      initializePlayer();
    }
  }, [libLoaded, item, onPlay, onPause, onUserActive, onUserInActive, onComplete, config.player, enableWatchHistory, setPlayer, saveItem]);
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.remove();
      }
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames(styles.cinema, {[styles.fill]: !isTrailer})
  }, /* @__PURE__ */ React.createElement("div", {
    ref: playerElementRef
  }));
};
export default Cinema;
