import React, {useCallback, useEffect, useMemo, useState} from "../../../_snowpack/pkg/react.js";
import {useHistory} from "../../../_snowpack/pkg/react-router.js";
import {Helmet} from "../../../_snowpack/pkg/react-helmet.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {useFavorites} from "../../stores/FavoritesStore.js";
import useBlurImageUpdater from "../../hooks/useBlurImageUpdater.js";
import {cardUrl, movieURL, videoUrl} from "../../utils/formatting.js";
import VideoComponent from "../../components/Video/Video.js";
import ErrorPage from "../../components/ErrorPage/ErrorPage.js";
import CardGrid from "../../components/CardGrid/CardGrid.js";
import useMedia from "../../hooks/useMedia.js";
import {generateMovieJSONLD} from "../../utils/structuredData.js";
import {copyToClipboard} from "../../utils/dom.js";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay.js";
import useRecommendedPlaylist from "../../hooks/useRecommendationsPlaylist.js";
import {watchHistoryStore} from "../../stores/WatchHistoryStore.js";
import {VideoProgressMinMax} from "../../config.js";
import {ConfigStore} from "../../stores/ConfigStore.js";
import {AccountStore} from "../../stores/AccountStore.js";
import {addQueryParam} from "../../utils/history.js";
import {isAllowedToWatch} from "../../utils/cleeng.js";
import styles from "./Movie.module.css.proxy.js";
const Movie = ({match, location}) => {
  const history = useHistory();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const id = match?.params.id;
  const play = searchParams.get("play") === "1";
  const feedId = searchParams.get("l");
  const {options, recommendationsPlaylist, siteName} = ConfigStore.useState((s) => s.config);
  const accessModel = ConfigStore.useState((s) => s.accessModel);
  const posterFading = options?.posterFading === true;
  const enableSharing = options?.enableSharing === true;
  const {t} = useTranslation("video");
  const {isLoading, error, data: item} = useMedia(id);
  const itemRequiresSubscription = item?.requiresSubscription !== "false";
  useBlurImageUpdater(item);
  const {data: trailerItem} = useMedia(item?.trailerId || "");
  const {data: playlist} = useRecommendedPlaylist(recommendationsPlaylist || "", item);
  const {hasItem, saveItem, removeItem} = useFavorites();
  const watchHistory = watchHistoryStore.useState((s) => s.watchHistory);
  const watchHistoryItem = item && watchHistory.find(({mediaid, progress: progress2}) => {
    return mediaid === item.mediaid && progress2 > VideoProgressMinMax.Min && progress2 < VideoProgressMinMax.Max;
  });
  const progress = watchHistoryItem?.progress;
  const isFavorited = !!item && hasItem(item);
  const [hasShared, setHasShared] = useState(false);
  const [playTrailer, setPlayTrailer] = useState(false);
  const user = AccountStore.useState((state) => state.user);
  const subscription = AccountStore.useState((state) => state.subscription);
  const allowedToWatch = isAllowedToWatch(accessModel, !!user, itemRequiresSubscription, !!subscription);
  const goBack = () => item && history.push(videoUrl(item, searchParams.get("r"), false));
  const onCardClick = (item2) => history.push(cardUrl(item2));
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
    if (!id || !playlist)
      return;
    const index = playlist.playlist.findIndex(({mediaid}) => mediaid === id);
    const nextItem = playlist.playlist[index + 1];
    return nextItem && history.push(videoUrl(nextItem, searchParams.get("r"), true));
  }, [history, id, playlist, searchParams]);
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
    return item && history.push(videoUrl(item, searchParams.get("r"), true));
  }, [allowedToWatch, user, subscription, history, item, searchParams]);
  useEffect(() => {
    document.body.style.overflowY = play ? "hidden" : "";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [play]);
  useEffect(() => {
    (document.scrollingElement || document.body).scroll({top: 0, behavior: "smooth"});
  }, [id]);
  if (isLoading && !item)
    return /* @__PURE__ */ React.createElement(LoadingOverlay, null);
  if (!isLoading && error || !item)
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      title: t("video_not_found")
    });
  const pageTitle = `${item.title} - ${siteName}`;
  const canonicalUrl = item ? `${window.location.origin}${movieURL(item)}` : window.location.href;
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
    content: "video.other"
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
  })), item ? /* @__PURE__ */ React.createElement("script", {
    type: "application/ld+json"
  }, generateMovieJSONLD(item)) : null), /* @__PURE__ */ React.createElement(VideoComponent, {
    title: item.title,
    item,
    feedId: feedId ?? void 0,
    trailerItem,
    play: play && allowedToWatch,
    allowedToWatch,
    startWatchingLabel: formatStartWatchingLabel(),
    onStartWatchingClick: handleStartWatchingClick,
    goBack,
    onComplete: handleComplete,
    progress,
    poster: posterFading ? "fading" : "normal",
    enableSharing,
    hasShared,
    onShareClick,
    playTrailer,
    onTrailerClick: () => setPlayTrailer(true),
    onTrailerClose: () => setPlayTrailer(false),
    isFavorited,
    onFavoriteButtonClick: () => isFavorited ? removeItem(item) : saveItem(item)
  }, playlist ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: styles.related
  }, /* @__PURE__ */ React.createElement("h3", null, playlist.title)), /* @__PURE__ */ React.createElement(CardGrid, {
    playlist: playlist.playlist,
    onCardClick,
    isLoading,
    currentCardItem: item,
    currentCardLabel: t("currently_playing"),
    enableCardTitles: options.shelveTitles,
    accessModel,
    isLoggedIn: !!user,
    hasSubscription: !!subscription
  })) : void 0));
};
export default Movie;
