import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Button from "../Button/Button.js";
import styles from "./ResetPasswordForm.module.css.proxy.js";
const ResetPasswordForm = ({onCancel, onReset, submitting}) => {
  const {t} = useTranslation("account");
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.resetPassword
  }, /* @__PURE__ */ React.createElement("h5", {
    className: styles.title
  }, t("reset.reset_password")), /* @__PURE__ */ React.createElement("p", {
    className: styles.text
  }, t("reset.text")), /* @__PURE__ */ React.createElement(Button, {
    onClick: onReset,
    className: styles.button,
    fullWidth: true,
    color: "primary",
    label: t("reset.yes"),
    disabled: submitting
  }), /* @__PURE__ */ React.createElement(Button, {
    onClick: onCancel,
    fullWidth: true,
    label: t("reset.no")
  }));
};
export default ResetPasswordForm;
