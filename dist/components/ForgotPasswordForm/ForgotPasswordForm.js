import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Button from "../Button/Button.js";
import TextField from "../TextField/TextField.js";
import FormFeedback from "../FormFeedback/FormFeedback.js";
import styles from "./ForgotPasswordForm.module.css.proxy.js";
const ForgotPasswordForm = ({onSubmit, onChange, value, errors, submitting, onBlur}) => {
  const {t} = useTranslation("account");
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit,
    "data-testid": "forgot-password-form",
    noValidate: true,
    className: styles.forgotPasswordForm
  }, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, t("reset.forgot_password")), errors.form ? /* @__PURE__ */ React.createElement(FormFeedback, {
    variant: "error"
  }, errors.form) : null, /* @__PURE__ */ React.createElement("p", {
    className: styles.text
  }, t("reset.forgot_text")), /* @__PURE__ */ React.createElement(TextField, {
    value: value.email,
    onChange,
    onBlur,
    label: t("reset.email"),
    placeholder: t("reset.email"),
    error: !!errors.email || !!errors.form,
    helperText: errors.email,
    required: true,
    name: "email",
    type: "email"
  }), /* @__PURE__ */ React.createElement(Button, {
    type: "submit",
    className: styles.button,
    fullWidth: true,
    color: "primary",
    disabled: submitting,
    label: t("reset.email_me")
  }));
};
export default ForgotPasswordForm;
