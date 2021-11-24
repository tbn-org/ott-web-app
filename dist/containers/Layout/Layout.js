import React, {useEffect, useRef, useState} from "../../../_snowpack/pkg/react.js";
import {Helmet} from "../../../_snowpack/pkg/react-helmet.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../../../_snowpack/pkg/react-router.js";
import {AccountStore} from "../../stores/AccountStore.js";
import useSearchQueryUpdater from "../../hooks/useSearchQueryUpdater.js";
import {UIStore} from "../../stores/UIStore.js";
import Button from "../../components/Button/Button.js";
import MarkdownComponent from "../../components/MarkdownComponent/MarkdownComponent.js";
import Header from "../../components/Header/Header.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import DynamicBlur from "../../components/DynamicBlur/DynamicBlur.js";
import MenuButton from "../../components/MenuButton/MenuButton.js";
import {addQueryParam} from "../../utils/history.js";
import UserMenu from "../../components/UserMenu/UserMenu.js";
import {ConfigStore} from "../../stores/ConfigStore.js";
import styles from "./Layout.module.css.proxy.js";
const Layout = ({children}) => {
  const history = useHistory();
  const {t} = useTranslation("common");
  const config = ConfigStore.useState((s) => s.config);
  const {menu, assets, options, siteName, description, footerText, searchPlaylist, cleengId} = config;
  const accessModel = ConfigStore.useState((s) => s.accessModel);
  const blurImage = UIStore.useState((s) => s.blurImage);
  const searchQuery = UIStore.useState((s) => s.searchQuery);
  const searchActive = UIStore.useState((s) => s.searchActive);
  const userMenuOpen = UIStore.useState((s) => s.userMenuOpen);
  const {updateSearchQuery, resetSearchQuery} = useSearchQueryUpdater();
  const isLoggedIn = !!AccountStore.useState((state) => state.user);
  const searchInputRef = useRef(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const hasDynamicBlur = options.dynamicBlur === true;
  const banner = assets.banner;
  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchActive]);
  const searchButtonClickHandler = () => {
    UIStore.update((s) => {
      s.searchActive = true;
    });
  };
  const closeSearchButtonClickHandler = () => {
    resetSearchQuery();
    UIStore.update((s) => {
      s.searchActive = false;
    });
  };
  const loginButtonClickHandler = () => {
    history.push(addQueryParam(history, "u", "login"));
  };
  const signUpButtonClickHandler = () => {
    history.push(addQueryParam(history, "u", "create-account"));
  };
  const toggleUserMenu = (value) => UIStore.update((state) => {
    state.userMenuOpen = value;
  });
  const renderUserActions = () => {
    if (!cleengId)
      return null;
    return isLoggedIn ? /* @__PURE__ */ React.createElement(UserMenu, {
      showPaymentsItem: accessModel === "SVOD"
    }) : /* @__PURE__ */ React.createElement("div", {
      className: styles.buttonContainer
    }, /* @__PURE__ */ React.createElement(Button, {
      fullWidth: true,
      onClick: loginButtonClickHandler,
      label: t("sign_in")
    }), /* @__PURE__ */ React.createElement(Button, {
      variant: "contained",
      color: "primary",
      onClick: signUpButtonClickHandler,
      label: t("sign_up"),
      fullWidth: true
    }));
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.layout
  }, /* @__PURE__ */ React.createElement(Helmet, null, /* @__PURE__ */ React.createElement("title", null, siteName), /* @__PURE__ */ React.createElement("meta", {
    name: "description",
    content: description
  }), /* @__PURE__ */ React.createElement("meta", {
    property: "og:description",
    content: description
  }), /* @__PURE__ */ React.createElement("meta", {
    property: "og:title",
    content: siteName
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "twitter:title",
    content: siteName
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "twitter:description",
    content: description
  })), /* @__PURE__ */ React.createElement("div", {
    className: styles.main
  }, hasDynamicBlur && blurImage && /* @__PURE__ */ React.createElement(DynamicBlur, {
    url: blurImage,
    transitionTime: 1,
    debounceTime: 350
  }), /* @__PURE__ */ React.createElement(Header, {
    onMenuButtonClick: () => setSideBarOpen(true),
    logoSrc: banner,
    searchEnabled: !!searchPlaylist,
    searchBarProps: {
      query: searchQuery,
      onQueryChange: (event) => updateSearchQuery(event.target.value),
      onClearButtonClick: () => updateSearchQuery(""),
      inputRef: searchInputRef
    },
    searchActive,
    onSearchButtonClick: searchButtonClickHandler,
    onCloseSearchButtonClick: closeSearchButtonClickHandler,
    onLoginButtonClick: loginButtonClickHandler,
    onSignUpButtonClick: signUpButtonClickHandler,
    isLoggedIn,
    userMenuOpen,
    toggleUserMenu,
    canLogin: !!cleengId,
    showPaymentsMenuItem: accessModel === "SVOD"
  }, /* @__PURE__ */ React.createElement(Button, {
    label: t("home"),
    to: "/",
    variant: "text"
  }), menu.map((item) => /* @__PURE__ */ React.createElement(Button, {
    key: item.playlistId,
    label: item.label,
    to: `/p/${item.playlistId}`,
    variant: "text"
  }))), /* @__PURE__ */ React.createElement(Sidebar, {
    isOpen: sideBarOpen,
    onClose: () => setSideBarOpen(false)
  }, /* @__PURE__ */ React.createElement(MenuButton, {
    label: t("home"),
    to: "/",
    tabIndex: sideBarOpen ? 0 : -1
  }), menu.map((item) => /* @__PURE__ */ React.createElement(MenuButton, {
    key: item.playlistId,
    label: item.label,
    to: `/p/${item.playlistId}`,
    tabIndex: sideBarOpen ? 0 : -1
  })), /* @__PURE__ */ React.createElement("hr", {
    className: styles.divider
  }), renderUserActions()), children), !!footerText && /* @__PURE__ */ React.createElement("div", {
    className: styles.footer
  }, /* @__PURE__ */ React.createElement(MarkdownComponent, {
    markdownString: footerText
  })));
};
export default Layout;
