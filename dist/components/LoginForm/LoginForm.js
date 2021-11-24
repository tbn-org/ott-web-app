import React from "../../../_snowpack/pkg/react.js";
import {useHistory} from "../../../_snowpack/pkg/react-router.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import useToggle from "../../hooks/useToggle.js";
import {addQueryParam} from "../../utils/history.js";
import TextField from "../TextField/TextField.js";
import Button from "../Button/Button.js";
import Link from "../Link/Link.js";
import IconButton from "../IconButton/IconButton.js";
import Visibility from "../../icons/Visibility.js";
import VisibilityOff from "../../icons/VisibilityOff.js";
import FormFeedback from "../FormFeedback/FormFeedback.js";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.js";
import styles from "./LoginForm.module.css.proxy.js";
const LoginForm = ({onSubmit, onChange, values, errors, submitting, siteName}) => {
  const [viewPassword, toggleViewPassword] = useToggle();
  const {t} = useTranslation("account");
  const history = useHistory();
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit,
    "data-testid": "login-form",
    noValidate: true
  }, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, t("login.sign_in")), errors.form ? /* @__PURE__ */ React.createElement(FormFeedback, {
    variant: "error"
  }, errors.form) : null, /* @__PURE__ */ React.createElement(TextField, {
    value: values.email,
    onChange,
    label: t("login.email"),
    placeholder: t("login.email"),
    error: !!errors.email || !!errors.form,
    helperText: errors.email,
    name: "email",
    type: "email",
    required: true
  }), /* @__PURE__ */ React.createElement(TextField, {
    value: values.password,
    onChange,
    label: t("login.password"),
    placeholder: t("login.password"),
    error: !!errors.password || !!errors.form,
    helperText: errors.password,
    name: "password",
    type: viewPassword ? "text" : "password",
    rightControl: /* @__PURE__ */ React.createElement(IconButton, {
      "aria-label": viewPassword ? t("login.hide_password") : t("login.view_password"),
      onClick: () => toggleViewPassword()
    }, viewPassword ? /* @__PURE__ */ React.createElement(Visibility, null) : /* @__PURE__ */ React.createElement(VisibilityOff, null)),
    required: true
  }), submitting && /* @__PURE__ */ React.createElement(LoadingOverlay, {
    transparentBackground: true,
    inline: true
  }), /* @__PURE__ */ React.createElement(Link, {
    className: styles.link,
    to: addQueryParam(history, "u", "forgot-password")
  }, t("login.forgot_password")), /* @__PURE__ */ React.createElement(Button, {
    type: "submit",
    label: t("login.sign_in"),
    variant: "contained",
    color: "primary",
    size: "large",
    disabled: submitting,
    fullWidth: true
  }), /* @__PURE__ */ React.createElement("p", {
    className: styles.bottom
  }, t("login.not_registered", {siteName}), " ", /* @__PURE__ */ React.createElement(Link, {
    to: addQueryParam(history, "u", "create-account")
  }, t("login.sign_up"))));
};
export default LoginForm;
