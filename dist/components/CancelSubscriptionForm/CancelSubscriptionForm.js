import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Button from "../Button/Button.js";
import FormFeedback from "../FormFeedback/FormFeedback.js";
import styles from "./CancelSubscriptionForm.module.css.proxy.js";
const CancelSubscriptionForm = ({onConfirm, onCancel, error, submitting}) => {
  const {t} = useTranslation("account");
  return /* @__PURE__ */ React.createElement("div", null, error ? /* @__PURE__ */ React.createElement(FormFeedback, {
    variant: "error"
  }, error) : null, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, t("cancel_subscription.title")), /* @__PURE__ */ React.createElement("p", {
    className: styles.paragraph
  }, t("cancel_subscription.explanation")), /* @__PURE__ */ React.createElement(Button, {
    className: styles.confirmButton,
    label: t("cancel_subscription.unsubscribe"),
    color: "primary",
    variant: "contained",
    onClick: onConfirm,
    fullWidth: true,
    disabled: submitting
  }), /* @__PURE__ */ React.createElement(Button, {
    label: t("cancel_subscription.no_thanks"),
    variant: "outlined",
    onClick: onCancel,
    fullWidth: true
  }));
};
export default CancelSubscriptionForm;
