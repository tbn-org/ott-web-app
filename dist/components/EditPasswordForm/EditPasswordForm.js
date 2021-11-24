import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import FormFeedback from "../FormFeedback/FormFeedback.js";
import TextField from "../TextField/TextField.js";
import Button from "../Button/Button.js";
import IconButton from "../IconButton/IconButton.js";
import Visibility from "../../icons/Visibility.js";
import VisibilityOff from "../../icons/VisibilityOff.js";
import useToggle from "../../hooks/useToggle.js";
import PasswordStrength from "../PasswordStrength/PasswordStrength.js";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.js";
import styles from "./EditPasswordForm.module.css.proxy.js";
const EditPasswordForm = ({onSubmit, onChange, onBlur, value, errors, submitting}) => {
  const {t} = useTranslation("account");
  const [viewPassword, toggleViewPassword] = useToggle();
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit,
    "data-testid": "forgot-password-form",
    noValidate: true,
    className: styles.forgotPasswordForm
  }, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, t("reset.password_reset")), errors.form ? /* @__PURE__ */ React.createElement(FormFeedback, {
    variant: "error"
  }, errors.form) : null, /* @__PURE__ */ React.createElement(TextField, {
    className: styles.textField,
    value: value.password,
    onChange,
    onBlur,
    label: t("reset.new_password"),
    placeholder: t("reset.password"),
    error: !!errors.password || !!errors.form,
    helperText: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(PasswordStrength, {
      password: value.password
    }), t("reset.password_helper_text")),
    name: "password",
    type: viewPassword ? "text" : "password",
    rightControl: /* @__PURE__ */ React.createElement(IconButton, {
      "aria-label": viewPassword ? t("reset.hide_password") : t("reset.view_password"),
      onClick: () => toggleViewPassword()
    }, viewPassword ? /* @__PURE__ */ React.createElement(Visibility, null) : /* @__PURE__ */ React.createElement(VisibilityOff, null)),
    required: true
  }), /* @__PURE__ */ React.createElement(Button, {
    type: "submit",
    className: styles.button,
    fullWidth: true,
    color: "primary",
    disabled: submitting,
    label: t("reset.confirm")
  }), submitting && /* @__PURE__ */ React.createElement(LoadingOverlay, {
    transparentBackground: true,
    inline: true
  }));
};
export default EditPasswordForm;
