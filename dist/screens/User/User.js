import React, {useEffect, useState} from "../../../_snowpack/pkg/react.js";
import {Redirect, Route, Switch, useHistory, useLocation} from "../../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Favorites from "../../components/Favorites/Favorites.js";
import PlaylistContainer from "../../containers/Playlist/PlaylistContainer.js";
import {PersonalShelf} from "../../enum/PersonalShelf.js";
import useBlurImageUpdater from "../../hooks/useBlurImageUpdater.js";
import {cardUrl} from "../../utils/formatting.js";
import AccountContainer from "../../containers/Account/AccountContainer.js";
import SubscriptionContainer from "../../containers/Subscription/SubscriptionContainer.js";
import useBreakpoint, {Breakpoint} from "../../hooks/useBreakpoint.js";
import Button from "../../components/Button/Button.js";
import AccountComponent from "../../components/Account/Account.js";
import Payment from "../../components/Payment/Payment.js";
import AccountCircle from "../../icons/AccountCircle.js";
import Favorite from "../../icons/Favorite.js";
import BalanceWallet from "../../icons/BalanceWallet.js";
import Exit from "../../icons/Exit.js";
import {useFavorites} from "../../stores/FavoritesStore.js";
import {AccountStore, logout} from "../../stores/AccountStore.js";
import {addQueryParam} from "../../utils/history.js";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay.js";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog.js";
import {ConfigStore} from "../../stores/ConfigStore.js";
import styles from "./User.module.css.proxy.js";
const User = () => {
  const accessModel = ConfigStore.useState((s) => s.accessModel);
  const history = useHistory();
  const location = useLocation();
  const {t} = useTranslation("user");
  const breakpoint = useBreakpoint();
  const [clearFavoritesOpen, setClearFavoritesOpen] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const isLargeScreen = breakpoint > Breakpoint.md;
  const {user: customer, subscription, loading} = AccountStore.useState((state) => state);
  const updateBlurImage = useBlurImageUpdater();
  const {clearList: clearFavorites} = useFavorites();
  const onCardClick = (playlistItem) => history.push(cardUrl(playlistItem));
  const onCardHover = (playlistItem) => updateBlurImage(playlistItem.image);
  const handleCompleteSubscriptionClick = () => {
    history.push(addQueryParam(history, "u", "choose-offer"));
  };
  const handleCancelSubscriptionClick = () => {
    history.push(addQueryParam(history, "u", "unsubscribe"));
  };
  const handleRenewSubscriptionClick = () => {
    history.push(addQueryParam(history, "u", "renew-subscription"));
  };
  useEffect(() => updateBlurImage(""), [updateBlurImage]);
  useEffect(() => {
    if (!loading && !customer) {
      history.replace("/");
    }
  }, [history, customer, loading]);
  useEffect(() => {
    if (location.pathname === "/u/logout") {
      logout();
      history.push("/");
    }
  }, [location, history]);
  if (!customer) {
    return /* @__PURE__ */ React.createElement("div", {
      className: styles.user
    }, /* @__PURE__ */ React.createElement(LoadingOverlay, {
      inline: true
    }));
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.user
  }, isLargeScreen && /* @__PURE__ */ React.createElement("div", {
    className: styles.leftColumn
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.panel
  }, /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Button, {
    to: "/u/my-account",
    label: t("nav.account"),
    variant: "text",
    startIcon: /* @__PURE__ */ React.createElement(AccountCircle, null),
    className: styles.button
  })), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Button, {
    to: "/u/favorites",
    label: t("nav.favorites"),
    variant: "text",
    startIcon: /* @__PURE__ */ React.createElement(Favorite, null),
    className: styles.button
  })), accessModel === "SVOD" && /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(Button, {
    to: "/u/payments",
    label: t("nav.payments"),
    variant: "text",
    startIcon: /* @__PURE__ */ React.createElement(BalanceWallet, null),
    className: styles.button
  })), /* @__PURE__ */ React.createElement("li", {
    className: styles.logoutLi
  }, /* @__PURE__ */ React.createElement(Button, {
    to: "/u/logout",
    label: t("nav.logout"),
    variant: "text",
    startIcon: /* @__PURE__ */ React.createElement(Exit, null),
    className: styles.button
  }))))), /* @__PURE__ */ React.createElement("div", {
    className: styles.mainColumn
  }, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/u/my-account"
  }, /* @__PURE__ */ React.createElement(AccountContainer, null, ({
    customer: customer2,
    errors,
    isLoading,
    consentsLoading,
    publisherConsents,
    customerConsents,
    onUpdateEmailSubmit,
    onUpdateInfoSubmit,
    onUpdateConsentsSubmit,
    onReset
  }) => /* @__PURE__ */ React.createElement(AccountComponent, {
    customer: customer2,
    errors,
    isLoading,
    consentsLoading,
    publisherConsents,
    customerConsents,
    onUpdateEmailSubmit,
    onUpdateInfoSubmit,
    onUpdateConsentsSubmit,
    onReset,
    panelClassName: styles.panel,
    panelHeaderClassName: styles.panelHeader
  }))), /* @__PURE__ */ React.createElement(Route, {
    path: "/u/favorites"
  }, /* @__PURE__ */ React.createElement(PlaylistContainer, {
    playlistId: PersonalShelf.Favorites,
    showEmpty: true
  }, ({playlist, error, isLoading}) => /* @__PURE__ */ React.createElement(Favorites, {
    playlist: playlist.playlist,
    error,
    isLoading,
    onCardClick,
    onCardHover,
    onClearFavoritesClick: () => setClearFavoritesOpen(true),
    accessModel,
    hasSubscription: !!subscription
  })), /* @__PURE__ */ React.createElement(ConfirmationDialog, {
    open: clearFavoritesOpen,
    title: t("favorites.clear_favorites_title"),
    body: t("favorites.clear_favorites_body"),
    onConfirm: () => {
      clearFavorites();
      setClearFavoritesOpen(false);
    },
    onClose: () => setClearFavoritesOpen(false)
  })), /* @__PURE__ */ React.createElement(Route, {
    path: "/u/payments"
  }, accessModel === "SVOD" ? /* @__PURE__ */ React.createElement(SubscriptionContainer, null, ({activePaymentDetail, transactions, isLoading}) => /* @__PURE__ */ React.createElement(Payment, {
    activeSubscription: subscription,
    activePaymentDetail,
    transactions,
    customer,
    isLoading,
    panelClassName: styles.panel,
    panelHeaderClassName: styles.panelHeader,
    onCompleteSubscriptionClick: handleCompleteSubscriptionClick,
    onCancelSubscriptionClick: handleCancelSubscriptionClick,
    onRenewSubscriptionClick: handleRenewSubscriptionClick,
    onShowAllTransactionsClick: () => setShowAllTransactions(true),
    showAllTransactions
  })) : /* @__PURE__ */ React.createElement(Redirect, {
    to: "/u/my-account"
  })), /* @__PURE__ */ React.createElement(Route, {
    path: "/u/logout"
  }, /* @__PURE__ */ React.createElement(LoadingOverlay, {
    transparentBackground: true
  })), /* @__PURE__ */ React.createElement(Route, {
    path: "/u/:other?"
  }, /* @__PURE__ */ React.createElement(Redirect, {
    to: "/u/my-account"
  })))));
};
export default User;
