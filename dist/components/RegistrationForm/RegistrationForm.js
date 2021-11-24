import React from "../../../_snowpack/pkg/react.js";
import {useHistory} from "../../../_snowpack/pkg/react-router.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import useToggle from "../../hooks/useToggle.js";
import {addQueryParam} from "../../utils/history.js";
import TextField from "../TextField/TextField.js";
import Button from "../Button/Button.js";
import IconButton from "../IconButton/IconButton.js";
import Visibility from "../../icons/Visibility.js";
import VisibilityOff from "../../icons/VisibilityOff.js";
import PasswordStrength from "../PasswordStrength/PasswordStrength.js";
import Checkbox from "../Checkbox/Checkbox.js";
import FormFeedback from "../FormFeedback/FormFeedback.js";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.js";
import Link from "../Link/Link.js";
import styles from "./RegistrationForm.module.css.proxy.js";
const RegistrationForm = ({
  onSubmit,
  onChange,
  onBlur,
  values,
  errors,
  submitting,
  loading,
  canSubmit,
  publisherConsents,
  consentValues,
  onConsentChange,
  consentErrors
}) => {
  const [viewPassword, toggleViewPassword] = useToggle();
  const {t} = useTranslation("account");
  const history = useHistory();
  const formatConsentLabel = (label) => {
    const hasHrefOpenTag = /<a(.|\n)*?>/.test(label);
    const hasHrefCloseTag = /<\/a(.|\n)*?>/.test(label);
    if (hasHrefOpenTag && hasHrefCloseTag) {
      return /* @__PURE__ */ React.createElement("span", {
        dangerouslySetInnerHTML: {__html: label}
      });
    }
    return label;
  };
  if (loading) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {height: 400}
    }, /* @__PURE__ */ React.createElement(LoadingOverlay, {
      inline: true
    }));
  }
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit,
    "data-testid": "registration-form",
    noValidate: true
  }, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, t("registration.sign_up")), errors.form ? /* @__PURE__ */ React.createElement(FormFeedback, {
    variant: "error"
  }, errors.form) : null, /* @__PURE__ */ React.createElement(TextField, {
    value: values.email,
    onChange,
    onBlur,
    label: t("registration.email"),
    placeholder: t("registration.email"),
    error: !!errors.email || !!errors.form,
    helperText: errors.email,
    name: "email",
    type: "email",
    required: true
  }), /* @__PURE__ */ React.createElement(TextField, {
    value: values.password,
    onChange,
    onBlur,
    label: t("registration.password"),
    placeholder: t("registration.password"),
    error: !!errors.password || !!errors.form,
    helperText: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(PasswordStrength, {
      password: values.password
    }), t("registration.password_helper_text")),
    name: "password",
    type: viewPassword ? "text" : "password",
    rightControl: /* @__PURE__ */ React.createElement(IconButton, {
      "aria-label": viewPassword ? t("registration.hide_password") : t("registration.view_password"),
      onClick: () => toggleViewPassword()
    }, viewPassword ? /* @__PURE__ */ React.createElement(Visibility, null) : /* @__PURE__ */ React.createElement(VisibilityOff, null)),
    required: true
  }), publisherConsents?.map((consent, index) => /* @__PURE__ */ React.createElement(Checkbox, {
    key: index,
    name: consent.name,
    value: consent.value || "",
    error: consentErrors?.includes(consent.name),
    required: consent.required,
    checked: consentValues[consent.name] || false,
    onChange: onConsentChange,
    label: formatConsentLabel(consent.label)
  })), /* @__PURE__ */ React.createElement(Button, {
    className: styles.continue,
    type: "submit",
    label: t("registration.continue"),
    variant: "contained",
    color: "primary",
    size: "large",
    disabled: submitting || !canSubmit,
    fullWidth: true
  }), /* @__PURE__ */ React.createElement("p", {
    className: styles.bottom
  }, t("registration.already_account"), " ", /* @__PURE__ */ React.createElement(Link, {
    to: addQueryParam(history, "u", "login")
  }, t("login.sign_in"))), submitting && /* @__PURE__ */ React.createElement(LoadingOverlay, {
    transparentBackground: true,
    inline: true
  }));
};
export default RegistrationForm;
