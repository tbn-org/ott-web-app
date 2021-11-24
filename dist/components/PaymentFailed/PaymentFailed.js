import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Button from "../Button/Button.js";
import styles from "./PaymentFailed.module.css.proxy.js";
const PaymentFailed = ({type, message, onCloseButtonClick}) => {
  const {t} = useTranslation("account");
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, type === "cancelled" ? t("checkout.payment_cancelled") : t("checkout.payment_error")), /* @__PURE__ */ React.createElement("p", {
    className: styles.message
  }, type === "cancelled" ? t("checkout.payment_cancelled_message") : message), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Button, {
    label: t("checkout.close"),
    onClick: onCloseButtonClick,
    color: "primary",
    variant: "contained",
    size: "large",
    fullWidth: true
  })));
};
export default PaymentFailed;
