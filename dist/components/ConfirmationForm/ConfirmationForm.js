import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {useHistory, Link} from "../../../_snowpack/pkg/react-router-dom.js";
import Button from "../Button/Button.js";
import {addQueryParam} from "../../utils/history.js";
import styles from "./ConfirmationForm.module.css.proxy.js";
const ConfirmationForm = ({email, onBackToLogin, loggedIn}) => {
  const {t} = useTranslation("account");
  const history = useHistory();
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.forgotPasswordForm
  }, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, t("reset.link_sent")), /* @__PURE__ */ React.createElement("p", {
    className: styles.text
  }, t("reset.link_sent_text", {email})), /* @__PURE__ */ React.createElement(Button, {
    onClick: onBackToLogin,
    className: styles.button,
    fullWidth: true,
    color: "primary",
    label: t("reset.back_login")
  }), !loggedIn && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: styles.notSure
  }, t("reset.not_sure")), /* @__PURE__ */ React.createElement(Link, {
    className: styles.link,
    to: addQueryParam(history, "u", "forgot-password")
  }, t("reset.try_again"))));
};
export default ConfirmationForm;
