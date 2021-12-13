import React from "../../../_snowpack/pkg/react.js";
import {Route, Switch, Redirect} from "../../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import User from "../../screens/User/User.js";
import Series from "../../screens/Series/Series.js";
import Layout from "../../containers/Layout/Layout.js";
import Home from "../../screens/Home/Home.js";
import Playlist from "../../screens/Playlist/Playlist.js";
import Movie from "../../screens/Movie/Movie.js";
import Search from "../../screens/Search/Search.js";
import ErrorPage from "../ErrorPage/ErrorPage.js";
import AccountModal from "../../containers/AccountModal/AccountModal.js";
import About from "../../screens/About/About.js";
const Root = ({error}) => {
  const {t} = useTranslation("error");
  if (error) {
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      title: t("generic_error_heading", "There was an issue loading the application")
    }, /* @__PURE__ */ React.createElement("p", null, t("generic_error_description", "Try refreshing this page or come back later.")));
  }
  if (window.html404) {
    window.html404 = false;
    return /* @__PURE__ */ React.createElement(Redirect, {
      to: "/404"
    });
  }
  return /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/",
    component: Home,
    exact: true
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/p/:id",
    component: Playlist,
    exact: true
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/m/:id/:slug?",
    component: Movie,
    exact: true
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/s/:id/:slug?",
    component: Series
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/q/:query?",
    component: Search
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/u/:page?",
    component: User
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/o/about",
    component: About
  }), /* @__PURE__ */ React.createElement(Route, null, /* @__PURE__ */ React.createElement(ErrorPage, {
    title: t("notfound_error_heading", "Not found")
  }, /* @__PURE__ */ React.createElement("p", null, t("notfound_error_description", "This page doesn't exist."))))), /* @__PURE__ */ React.createElement(AccountModal, null));
};
export default Root;
