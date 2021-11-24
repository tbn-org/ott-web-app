import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Button from "../Button/Button.js";
import styles from "./SubscriptionCancelled.module.css.proxy.js";
const SubscriptionCancelled = ({expiresDate, onClose}) => {
  const {t} = useTranslation("account");
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.SubscriptionCancelled
  }, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, t("subscription_cancelled.title")), /* @__PURE__ */ React.createElement("p", {
    className: styles.paragraph
  }, t("subscription_cancelled.message", {date: expiresDate})), /* @__PURE__ */ React.createElement(Button, {
    label: t("subscription_cancelled.return_to_profile"),
    variant: "outlined",
    onClick: onClose,
    fullWidth: true
  }));
};
export default SubscriptionCancelled;
