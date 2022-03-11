import React, {useContext} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {ConfigContext} from "../../providers/ConfigProvider.js";
import Button from "../Button/Button.js";
import CardGrid from "../CardGrid/CardGrid.js";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.js";
import ErrorPage from "../ErrorPage/ErrorPage.js";
import {Breakpoint} from "../../hooks/useBreakpoint.js";
import styles from "./Favorites.module.css.proxy.js";
const cols = {
  [Breakpoint.xs]: 2,
  [Breakpoint.sm]: 3,
  [Breakpoint.md]: 3,
  [Breakpoint.lg]: 3,
  [Breakpoint.xl]: 3
};
const Favorites = ({
  playlist,
  error,
  isLoading,
  accessModel,
  hasSubscription,
  onCardClick,
  onCardHover,
  onClearFavoritesClick
}) => {
  const {t} = useTranslation("user");
  const config = useContext(ConfigContext);
  if (isLoading)
    return /* @__PURE__ */ React.createElement(LoadingOverlay, null);
  if (error || !playlist) {
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      title: t("favorites.not_found")
    });
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: styles.header
  }, /* @__PURE__ */ React.createElement("h3", null, t("favorites.title")), playlist.length > 0 ? /* @__PURE__ */ React.createElement(Button, {
    label: t("favorites.clear"),
    onClick: onClearFavoritesClick
  }) : null), playlist.length > 0 ? /* @__PURE__ */ React.createElement(CardGrid, {
    playlist,
    onCardClick,
    onCardHover,
    cols,
    isLoading,
    enableCardTitles: config.options.shelfTitles,
    accessModel,
    isLoggedIn: true,
    hasSubscription
  }) : /* @__PURE__ */ React.createElement("p", null, t("favorites.no_favorites")));
};
export default Favorites;
