import React, {useEffect, useMemo, useState} from "../../../_snowpack/pkg/react.js";
import {useHistory} from "../../../_snowpack/pkg/react-router-dom.js";
import {Helmet} from "../../../_snowpack/pkg/react-helmet.js";
import {cardUrl} from "../../utils/formatting.js";
import usePlaylist from "../../hooks/usePlaylist.js";
import {filterPlaylist, getFiltersFromConfig} from "../../utils/collection.js";
import CardGrid from "../../components/CardGrid/CardGrid.js";
import ErrorPage from "../../components/ErrorPage/ErrorPage.js";
import Filter from "../../components/Filter/Filter.js";
import useBlurImageUpdater from "../../hooks/useBlurImageUpdater.js";
import {AccountStore} from "../../stores/AccountStore.js";
import {ConfigStore} from "../../stores/ConfigStore.js";
import styles from "./Playlist.module.css.proxy.js";
function Playlist({
  match: {
    params: {id}
  }
}) {
  const history = useHistory();
  const config = ConfigStore.useState((state) => state.config);
  const accessModel = ConfigStore.useState((s) => s.accessModel);
  const {isLoading, isPlaceholderData, error, data: {title, playlist} = {title: "", playlist: []}} = usePlaylist(id);
  const [filter, setFilter] = useState("");
  const categories = getFiltersFromConfig(config, id);
  const filteredPlaylist = useMemo(() => filterPlaylist(playlist, filter), [playlist, filter]);
  const updateBlurImage = useBlurImageUpdater(filteredPlaylist);
  const user = AccountStore.useState((state) => state.user);
  const subscription = !!AccountStore.useState((state) => state.subscription);
  useEffect(() => {
    setFilter("");
  }, [id]);
  const onCardClick = (playlistItem) => history.push(cardUrl(playlistItem, id));
  const onCardHover = (playlistItem) => updateBlurImage(playlistItem.image);
  if (error || !playlist) {
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      title: "Playlist not found!"
    });
  }
  const pageTitle = `${title} - ${config.siteName}`;
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.playlist
  }, /* @__PURE__ */ React.createElement(Helmet, null, /* @__PURE__ */ React.createElement("title", null, pageTitle), /* @__PURE__ */ React.createElement("meta", {
    property: "og:title",
    content: pageTitle
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "twitter:title",
    content: pageTitle
  })), /* @__PURE__ */ React.createElement("header", {
    className: styles.header
  }, /* @__PURE__ */ React.createElement("h2", null, isLoading || isPlaceholderData ? "Loading" : title), !isLoading && !isPlaceholderData && /* @__PURE__ */ React.createElement(Filter, {
    name: "categories",
    value: filter,
    defaultLabel: "All",
    options: categories,
    setValue: setFilter
  })), /* @__PURE__ */ React.createElement("main", {
    className: styles.main
  }, /* @__PURE__ */ React.createElement(CardGrid, {
    playlist: filteredPlaylist,
    onCardClick,
    onCardHover,
    isLoading,
    enableCardTitles: config.options.shelfTitles,
    accessModel,
    isLoggedIn: !!user,
    hasSubscription: !!subscription
  })));
}
export default Playlist;
