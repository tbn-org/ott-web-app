import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Button from "../Button/Button.js";
import {formatDate, formatPrice} from "../../utils/formatting.js";
import FormFeedback from "../FormFeedback/FormFeedback.js";
import styles from "./RenewSubscriptionForm.module.css.proxy.js";
const RenewSubscriptionForm = ({subscription, customer, error, submitting, onConfirm, onClose}) => {
  const {t} = useTranslation("account");
  return /* @__PURE__ */ React.createElement("div", null, error ? /* @__PURE__ */ React.createElement(FormFeedback, {
    variant: "error"
  }, error) : null, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, t("renew_subscription.renew_your_subscription")), /* @__PURE__ */ React.createElement("p", {
    className: styles.paragraph
  }, t("renew_subscription.explanation")), /* @__PURE__ */ React.createElement("div", {
    className: styles.infoBox
  }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, subscription.offerTitle), " ", /* @__PURE__ */ React.createElement("br", null), t("renew_subscription.next_billing_date_on", {date: formatDate(subscription.expiresAt)})), /* @__PURE__ */ React.createElement("p", {
    className: styles.price
  }, /* @__PURE__ */ React.createElement("strong", null, formatPrice(subscription.nextPaymentPrice, subscription.nextPaymentCurrency, customer.country)), /* @__PURE__ */ React.createElement("small", null, "/", t(`periods.${subscription.period}`)))), /* @__PURE__ */ React.createElement(Button, {
    className: styles.confirmButton,
    color: "primary",
    variant: "contained",
    label: t("renew_subscription.renew_subscription"),
    onClick: onConfirm,
    fullWidth: true,
    disabled: submitting
  }), /* @__PURE__ */ React.createElement(Button, {
    label: t("renew_subscription.no_thanks"),
    onClick: onClose,
    fullWidth: true
  }));
};
export default RenewSubscriptionForm;
