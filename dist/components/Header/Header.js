import React, {useState} from "../../../_snowpack/pkg/react.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import AccountCircle from "../../icons/AccountCircle.js";
import SearchBar from "../SearchBar/SearchBar.js";
import Logo from "../Logo/Logo.js";
import Menu from "../../icons/Menu.js";
import SearchIcon from "../../icons/Search.js";
import CloseIcon from "../../icons/Close.js";
import IconButton from "../IconButton/IconButton.js";
import useBreakpoint, {Breakpoint} from "../../hooks/useBreakpoint.js";
import Button from "../Button/Button.js";
import Popover from "../Popover/Popover.js";
import UserMenu from "../UserMenu/UserMenu.js";
import styles from "./Header.module.css.proxy.js";
const Header = ({
  children,
  headerType = "static",
  onMenuButtonClick,
  logoSrc,
  searchBarProps,
  searchActive,
  onSearchButtonClick,
  searchEnabled,
  onCloseSearchButtonClick,
  onLoginButtonClick,
  onSignUpButtonClick,
  isLoggedIn,
  userMenuOpen,
  toggleUserMenu,
  canLogin = false,
  showPaymentsMenuItem
}) => {
  const {t} = useTranslation("menu");
  const [logoLoaded, setLogoLoaded] = useState(false);
  const breakpoint = useBreakpoint();
  const headerClassName = classNames(styles.header, styles[headerType], {
    [styles.brandCentered]: breakpoint <= Breakpoint.sm,
    [styles.mobileSearchActive]: searchActive && breakpoint <= Breakpoint.sm
  });
  const search = breakpoint <= Breakpoint.sm ? searchActive ? /* @__PURE__ */ React.createElement("div", {
    className: styles.mobileSearch
  }, /* @__PURE__ */ React.createElement(SearchBar, {
    ...searchBarProps
  }), /* @__PURE__ */ React.createElement(IconButton, {
    className: styles.iconButton,
    "aria-label": "Close search",
    onClick: () => {
      if (onCloseSearchButtonClick) {
        onCloseSearchButtonClick();
      }
    }
  }, /* @__PURE__ */ React.createElement(CloseIcon, null))) : /* @__PURE__ */ React.createElement(IconButton, {
    className: styles.iconButton,
    "aria-label": "Open search",
    onClick: () => {
      if (onSearchButtonClick) {
        onSearchButtonClick();
      }
    }
  }, /* @__PURE__ */ React.createElement(SearchIcon, null)) : /* @__PURE__ */ React.createElement(SearchBar, {
    ...searchBarProps
  });
  const renderUserActions = () => {
    if (!canLogin || breakpoint <= Breakpoint.sm)
      return null;
    return isLoggedIn ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(IconButton, {
      className: classNames(styles.iconButton, styles.userMenuButton),
      "aria-label": t("open_user_menu"),
      onClick: () => toggleUserMenu(!userMenuOpen)
    }, /* @__PURE__ */ React.createElement(AccountCircle, null)), /* @__PURE__ */ React.createElement(Popover, {
      isOpen: userMenuOpen,
      onClose: () => toggleUserMenu(false)
    }, /* @__PURE__ */ React.createElement(UserMenu, {
      onClick: () => toggleUserMenu(false),
      showPaymentsItem: showPaymentsMenuItem,
      inPopover: true
    }))) : /* @__PURE__ */ React.createElement("div", {
      className: styles.buttonContainer
    }, /* @__PURE__ */ React.createElement(Button, {
      onClick: onLoginButtonClick,
      label: t("sign_in")
    }), /* @__PURE__ */ React.createElement(Button, {
      variant: "contained",
      color: "primary",
      onClick: onSignUpButtonClick,
      label: t("sign_up")
    }));
  };
  return /* @__PURE__ */ React.createElement("header", {
    className: headerClassName
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.menu
  }, /* @__PURE__ */ React.createElement(IconButton, {
    className: styles.iconButton,
    "aria-label": t("open_menu"),
    onClick: onMenuButtonClick
  }, /* @__PURE__ */ React.createElement(Menu, null))), logoSrc && /* @__PURE__ */ React.createElement("div", {
    className: styles.brand
  }, /* @__PURE__ */ React.createElement(Logo, {
    src: logoSrc,
    onLoad: () => setLogoLoaded(true)
  })), /* @__PURE__ */ React.createElement("nav", {
    className: styles.nav,
    "aria-label": "menu"
  }, logoLoaded ? children : null), /* @__PURE__ */ React.createElement("div", {
    className: styles.search
  }, searchEnabled ? search : null), renderUserActions()));
};
export default Header;
