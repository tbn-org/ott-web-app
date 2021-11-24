import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Button from "../Button/Button.js";
import {formatDate, formatPrice} from "../../utils/formatting.js";
import styles from "./SubscriptionRenewed.module.css.proxy.js";
const SubscriptionRenewed = ({onClose, customer, subscription}) => {
  const {t} = useTranslation("account");
  const date = formatDate(subscription.expiresAt);
  const price = formatPrice(subscription.nextPaymentPrice, subscription.nextPaymentCurrency, customer.country);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, t("subscription_renewed.title")), /* @__PURE__ */ React.createElement("p", {
    className: styles.paragraph
  }, t("subscription_renewed.message", {date, price})), /* @__PURE__ */ React.createElement(Button, {
    label: t("subscription_renewed.back_to_profile"),
    onClick: onClose,
    fullWidth: true
  }));
};
export default SubscriptionRenewed;
