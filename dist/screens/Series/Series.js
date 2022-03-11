import React, {useCallback, useEffect, useMemo, useState} from "../../../_snowpack/pkg/react.js";
import {useHistory} from "../../../_snowpack/pkg/react-router.js";
import {Helmet} from "../../../_snowpack/pkg/react-helmet.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import CardGrid from "../../components/CardGrid/CardGrid.js";
import {useFavorites} from "../../stores/FavoritesStore.js";
import useBlurImageUpdater from "../../hooks/useBlurImageUpdater.js";
import {episodeURL} from "../../utils/formatting.js";
import Filter from "../../components/Filter/Filter.js";
import VideoComponent from "../../components/Video/Video.js";
import useMedia from "../../hooks/useMedia.js";
import usePlaylist from "../../hooks/usePlaylist.js";
import ErrorPage from "../../components/ErrorPage/ErrorPage.js";
import {generateEpisodeJSONLD} from "../../utils/structuredData.js";
import {copyToClipboard} from "../../utils/dom.js";
import {filterSeries, getFiltersFromSeries} from "../../utils/collection.js";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay.js";
import {useWatchHistory, watchHistoryStore} from "../../stores/WatchHistoryStore.js";
import {VideoProgressMinMax} from "../../config.js";
import {ConfigStore} from "../../stores/ConfigStore.js";
import {isAllowedToWatch} from "../../utils/cleeng.js";
import {AccountStore} from "../../stores/AccountStore.js";
import {addQueryParam} from "../../utils/history.js";
import styles from "./Series.module.css.proxy.js";
const Series = ({match, location}) => {
  const history = useHistory();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const id = match?.params.id;
  const episodeId = searchParams.get("e") || "";
  const play = searchParams.get("play") === "1";
  const feedId = searchParams.get("l");
  const {options, siteName} = ConfigStore.useState((s) => s.config);
  const accessModel = ConfigStore.useState((s) => s.accessModel);
  const posterFading = options?.posterFading === true;
  const enableSharing = options?.enableSharing === true;
  const {t} = useTranslation("video");
  const {isLoading, error, data: item} = useMedia(episodeId);
  const itemRequiresSubscription = item?.requiresSubscription !== "false";
  useBlurImageUpdater(item);
  const {data: trailerItem} = useMedia(item?.trailerId || "");
  const {
    isLoading: playlistIsLoading,
    error: playlistError,
    data: seriesPlaylist = {title: "", playlist: []}
  } = usePlaylist(id, void 0, true, false);
  const [seasonFilter, setSeasonFilter] = useState("");
  const filters = getFiltersFromSeries(seriesPlaylist.playlist);
  const filteredPlaylist = useMemo(() => filterSeries(seriesPlaylist.playlist, seasonFilter), [seriesPlaylist, seasonFilter]);
  const {hasItem, saveItem, removeItem} = useFavorites();
  const watchHistory = watchHistoryStore.useState((s) => s.watchHistory);
  const watchHistoryItem = item && watchHistory.find(({mediaid, progress: progress2}) => {
    return mediaid === item.mediaid && progress2 > VideoProgressMinMax.Min && progress2 < VideoProgressMinMax.Max;
  });
  const progress = watchHistoryItem?.progress;
  const {getDictionary: getWatchHistoryDictionary} = useWatchHistory();
  const watchHistoryDictionary = getWatchHistoryDictionary();
  const isFavorited = !!item && hasItem(item);
  const [hasShared, setHasShared] = useState(false);
  const [playTrailer, setPlayTrailer] = useState(false);
  const user = AccountStore.useState((state) => state.user);
  const subscription = AccountStore.useState((state) => state.subscription);
  const allowedToWatch = isAllowedToWatch(accessModel, !!user, itemRequiresSubscription, !!subscription);
  const goBack = () => item && seriesPlaylist && history.push(episodeURL(seriesPlaylist, item.mediaid, false));
  const onCardClick = (item2) => seriesPlaylist && history.push(episodeURL(seriesPlaylist, item2.mediaid));
  const onShareClick = () => {
    if (!item)
      return;
    if (typeof navigator.share === "function") {
      navigator.share({title: item.title, text: item.description, url: window.location.href});
      return;
    }
    copyToClipboard(window.location.href);
    setHasShared(true);
    setTimeout(() => setHasShared(false), 2e3);
  };
  const handleComplete = useCallback(() => {
    if (!item || !seriesPlaylist)
      return;
    const index = seriesPlaylist.playlist.findIndex(({mediaid}) => mediaid === item.mediaid);
    const nextItem = seriesPlaylist.playlist[index + 1];
    return nextItem && history.push(episodeURL(seriesPlaylist, nextItem.mediaid, true));
  }, [history, item, seriesPlaylist]);
  const formatStartWatchingLabel = () => {
    if (!allowedToWatch && !user)
      return t("sign_up_to_start_watching");
    if (!allowedToWatch && !subscription)
      return t("complete_your_subscription");
    return typeof progress === "number" ? t("continue_watching") : t("start_watching");
  };
  const handleStartWatchingClick = useCallback(() => {
    if (!allowedToWatch && !user)
      return history.push(addQueryParam(history, "u", "create-account"));
    if (!allowedToWatch && !subscription)
      return history.push("/u/payments");
    return history.push(episodeURL(seriesPlaylist, item?.mediaid, true));
  }, [allowedToWatch, user, history, subscription, seriesPlaylist, item?.mediaid]);
  useEffect(() => {
    document.body.style.overflowY = play ? "hidden" : "";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [play]);
  useEffect(() => {
    (document.scrollingElement || document.body).scroll({top: 0, behavior: "smooth"});
  }, [episodeId]);
  useEffect(() => {
    if (!searchParams.has("e") && seriesPlaylist?.playlist.length) {
      history.replace(episodeURL(seriesPlaylist, seriesPlaylist.playlist[0].mediaid));
    }
  }, [history, searchParams, seriesPlaylist]);
  if (!item && isLoading || playlistIsLoading || !searchParams.has("e"))
    return /* @__PURE__ */ React.createElement(LoadingOverlay, null);
  if (!isLoading && error || !item)
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      title: t("episode_not_found")
    });
  if (playlistError || !seriesPlaylist)
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      title: t("series_not_found")
    });
  const pageTitle = `${item.title} - ${siteName}`;
  const canonicalUrl = seriesPlaylist && item ? `${window.location.origin}${episodeURL(seriesPlaylist, item.mediaid)}` : window.location.href;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Helmet, null, /* @__PURE__ */ React.createElement("title", null, pageTitle), /* @__PURE__ */ React.createElement("link", {
    rel: "canonical",
    href: canonicalUrl
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "description",
    content: item.description
  }), /* @__PURE__ */ React.createElement("meta", {
    property: "og:description",
    content: item.description
  }), /* @__PURE__ */ React.createElement("meta", {
    property: "og:title",
    content: pageTitle
  }), /* @__PURE__ */ React.createElement("meta", {
    property: "og:type",
    content: "video.episode"
  }), item.image && /* @__PURE__ */ React.createElement("meta", {
    property: "og:image",
    content: item.image?.replace(/^https:/, "http:")
  }), item.image && /* @__PURE__ */ React.createElement("meta", {
    property: "og:image:secure_url",
    content: item.image?.replace(/^http:/, "https:")
  }), /* @__PURE__ */ React.createElement("meta", {
    property: "og:image:width",
    content: item.image ? "720" : ""
  }), /* @__PURE__ */ React.createElement("meta", {
    property: "og:image:height",
    content: item.image ? "406" : ""
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "twitter:title",
    content: pageTitle
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "twitter:description",
    content: item.description
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "twitter:image",
    content: item.image
  }), /* @__PURE__ */ React.createElement("meta", {
    property: "og:video",
    content: canonicalUrl.replace(/^https:/, "http:")
  }), /* @__PURE__ */ React.createElement("meta", {
    property: "og:video:secure_url",
    content: canonicalUrl.replace(/^http:/, "https:")
  }), /* @__PURE__ */ React.createElement("meta", {
    property: "og:video:type",
    content: "text/html"
  }), /* @__PURE__ */ React.createElement("meta", {
    property: "og:video:width",
    content: "1280"
  }), /* @__PURE__ */ React.createElement("meta", {
    property: "og:video:height",
    content: "720"
  }), item.tags?.split(",").map((tag) => /* @__PURE__ */ React.createElement("meta", {
    property: "og:video:tag",
    content: tag,
    key: tag
  })), seriesPlaylist && item ? /* @__PURE__ */ React.createElement("script", {
    type: "application/ld+json"
  }, generateEpisodeJSONLD(seriesPlaylist, item)) : null), /* @__PURE__ */ React.createElement(VideoComponent, {
    title: seriesPlaylist.title,
    episodeCount: seriesPlaylist.playlist.length,
    item,
    feedId: feedId ?? void 0,
    trailerItem,
    play: play && allowedToWatch,
    allowedToWatch,
    progress,
    startWatchingLabel: formatStartWatchingLabel(),
    onStartWatchingClick: handleStartWatchingClick,
    goBack,
    onComplete: handleComplete,
    poster: posterFading ? "fading" : "normal",
    enableSharing,
    hasShared,
    onShareClick,
    playTrailer,
    onTrailerClick: () => setPlayTrailer(true),
    onTrailerClose: () => setPlayTrailer(false),
    isFavorited,
    onFavoriteButtonClick: () => isFavorited ? removeItem(item) : saveItem(item),
    isSeries: true
  }, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: styles.episodes
  }, /* @__PURE__ */ React.createElement("h3", null, t("episodes")), filters.length > 1 && /* @__PURE__ */ React.createElement(Filter, {
    name: "categories",
    value: seasonFilter,
    valuePrefix: t("season_prefix"),
    defaultLabel: t("all_seasons"),
    options: filters,
    setValue: setSeasonFilter
  })), /* @__PURE__ */ React.createElement(CardGrid, {
    playlist: filteredPlaylist,
    onCardClick,
    watchHistory: watchHistoryDictionary,
    isLoading,
    currentCardItem: item,
    currentCardLabel: t("current_episode"),
    enableCardTitles: options.shelfTitles,
    accessModel,
    isLoggedIn: !!user,
    hasSubscription: !!subscription
  }))));
};
export default Series;
