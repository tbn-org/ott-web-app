import React, {useEffect} from "../../../_snowpack/pkg/react.js";
import {useHistory} from "../../../_snowpack/pkg/react-router.js";
import {Helmet} from "../../../_snowpack/pkg/react-helmet.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import useBlurImageUpdater from "../../hooks/useBlurImageUpdater.js";
import {UIStore} from "../../stores/UIStore.js";
import useSearchQueryUpdater from "../../hooks/useSearchQueryUpdater.js";
import ErrorPage from "../../components/ErrorPage/ErrorPage.js";
import CardGrid from "../../components/CardGrid/CardGrid.js";
import {cardUrl} from "../../utils/formatting.js";
import useFirstRender from "../../hooks/useFirstRender.js";
import useSearchPlaylist from "../../hooks/useSearchPlaylist.js";
import {AccountStore} from "../../stores/AccountStore.js";
import {ConfigStore} from "../../stores/ConfigStore.js";
import styles from "./Search.module.css.proxy.js";
const Search = ({
  match: {
    params: {query}
  }
}) => {
  const {t} = useTranslation("search");
  const config = ConfigStore.useState((state) => state.config);
  const {siteName, searchPlaylist, options} = config;
  const accessModel = ConfigStore.useState((s) => s.accessModel);
  const firstRender = useFirstRender();
  const searchQuery = UIStore.useState((s) => s.searchQuery);
  const {updateSearchQuery} = useSearchQueryUpdater();
  const history = useHistory();
  const {isFetching, error, data: {playlist} = {playlist: []}} = useSearchPlaylist(searchPlaylist || "", query, firstRender);
  const updateBlurImage = useBlurImageUpdater(playlist);
  const user = AccountStore.useState((state) => state.user);
  const subscription = !!AccountStore.useState((state) => state.subscription);
  useEffect(() => {
    if (!firstRender) {
      return;
    }
    if (query && query !== searchQuery) {
      updateSearchQuery(query);
    }
  }, [firstRender, query, searchQuery, updateSearchQuery]);
  const onCardClick = (playlistItem) => {
    UIStore.update((s) => {
      s.searchQuery = "";
      s.searchActive = false;
    });
    history.push(cardUrl(playlistItem, searchPlaylist));
  };
  const onCardHover = (playlistItem) => updateBlurImage(playlistItem.image);
  if ((error || !playlist) && !isFetching) {
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      title: t("error_heading")
    }, /* @__PURE__ */ React.createElement("h6", null, t("error_subheading")), /* @__PURE__ */ React.createElement("p", null, t("error_description")));
  }
  if (!query) {
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      title: t("start_typing")
    });
  }
  if (!playlist.length) {
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      title: t("no_results_heading", {query})
    }, /* @__PURE__ */ React.createElement("h6", null, t("suggestions")), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, t("tip_one")), /* @__PURE__ */ React.createElement("li", null, t("tip_two")), /* @__PURE__ */ React.createElement("li", null, t("tip_three"))));
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.search
  }, /* @__PURE__ */ React.createElement(Helmet, null, /* @__PURE__ */ React.createElement("title", null, t("title", {results: playlist.length, query}), " - ", siteName)), /* @__PURE__ */ React.createElement("header", {
    className: styles.header
  }, /* @__PURE__ */ React.createElement("h2", null, t("heading"))), /* @__PURE__ */ React.createElement("main", {
    className: styles.main
  }, /* @__PURE__ */ React.createElement(CardGrid, {
    playlist,
    onCardClick,
    onCardHover,
    isLoading: firstRender,
    enableCardTitles: options.shelveTitles,
    accessModel,
    isLoggedIn: !!user,
    hasSubscription: !!subscription
  })));
};
export default Search;
