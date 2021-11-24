import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import AccountCircle from "../../icons/AccountCircle.js";
import Favorite from "../../icons/Favorite.js";
import BalanceWallet from "../../icons/BalanceWallet.js";
import Exit from "../../icons/Exit.js";
import MenuButton from "../MenuButton/MenuButton.js";
import styles from "./UserMenu.module.css.proxy.js";
const UserMenu = ({showPaymentsItem, inPopover = false, onClick}) => {
  const {t} = useTranslation("user");
  const menuItems = /* @__PURE__ */ React.createElement("ul", {
    className: styles.menuItems
  }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(MenuButton, {
    small: inPopover,
    onClick,
    to: "/u/my-account",
    label: t("nav.account"),
    startIcon: /* @__PURE__ */ React.createElement(AccountCircle, null)
  })), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(MenuButton, {
    small: inPopover,
    onClick,
    to: "/u/favorites",
    label: t("nav.favorites"),
    startIcon: /* @__PURE__ */ React.createElement(Favorite, null)
  })), showPaymentsItem && /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(MenuButton, {
    small: inPopover,
    onClick,
    to: "/u/payments",
    label: t("nav.payments"),
    startIcon: /* @__PURE__ */ React.createElement(BalanceWallet, null)
  })), /* @__PURE__ */ React.createElement("hr", {
    className: classNames(styles.divider, {[styles.inPopover]: inPopover})
  }), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(MenuButton, {
    small: inPopover,
    onClick,
    to: "/u/logout",
    label: t("nav.logout"),
    startIcon: /* @__PURE__ */ React.createElement(Exit, null)
  })));
  if (inPopover) {
    return /* @__PURE__ */ React.createElement("nav", {
      className: styles.panel
    }, menuItems);
  }
  return menuItems;
};
export default UserMenu;
