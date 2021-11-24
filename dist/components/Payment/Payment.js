import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {formatDate, formatPrice} from "../../utils/formatting.js";
import TextField from "../TextField/TextField.js";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.js";
import Button from "../Button/Button.js";
import styles from "./Payment.module.css.proxy.js";
const VISIBLE_TRANSACTIONS = 4;
const Payment = ({
  onCompleteSubscriptionClick,
  onCancelSubscriptionClick,
  onRenewSubscriptionClick,
  activePaymentDetail,
  activeSubscription,
  transactions,
  customer,
  isLoading,
  panelClassName,
  panelHeaderClassName,
  onShowAllTransactionsClick,
  showAllTransactions
}) => {
  const {t} = useTranslation(["user", "account"]);
  const hiddenTransactionsCount = transactions ? transactions?.length - VISIBLE_TRANSACTIONS : 0;
  const hasMoreTransactions = hiddenTransactionsCount > 0;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: panelClassName
  }, /* @__PURE__ */ React.createElement("div", {
    className: panelHeaderClassName
  }, /* @__PURE__ */ React.createElement("h3", null, t("user:payment.subscription_details"))), activeSubscription ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: styles.infoBox,
    key: activeSubscription.subscriptionId
  }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, t("user:payment.monthly_subscription")), " ", /* @__PURE__ */ React.createElement("br", null), activeSubscription.status === "active" ? t("user:payment.next_billing_date_on", {date: formatDate(activeSubscription.expiresAt)}) : t("user:payment.subscription_expires_on", {date: formatDate(activeSubscription.expiresAt)})), /* @__PURE__ */ React.createElement("p", {
    className: styles.price
  }, /* @__PURE__ */ React.createElement("strong", null, formatPrice(activeSubscription.totalPrice, activeSubscription.nextPaymentCurrency, customer.country)), /* @__PURE__ */ React.createElement("small", null, "/", t(`account:periods.${activeSubscription.period}`)))), activeSubscription.status === "active" ? /* @__PURE__ */ React.createElement(Button, {
    label: t("user:payment.cancel_subscription"),
    onClick: onCancelSubscriptionClick
  }) : /* @__PURE__ */ React.createElement(Button, {
    label: t("user:payment.renew_subscription"),
    onClick: onRenewSubscriptionClick
  })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, t("user:payment.no_subscription")), /* @__PURE__ */ React.createElement(Button, {
    variant: "contained",
    color: "primary",
    label: t("user:payment.complete_subscription"),
    onClick: onCompleteSubscriptionClick
  }))), /* @__PURE__ */ React.createElement("div", {
    className: panelClassName
  }, /* @__PURE__ */ React.createElement("div", {
    className: panelHeaderClassName
  }, /* @__PURE__ */ React.createElement("h3", null, t("user:payment.payment_method"))), activePaymentDetail ? /* @__PURE__ */ React.createElement("div", {
    key: activePaymentDetail.id
  }, /* @__PURE__ */ React.createElement(TextField, {
    label: t("user:payment.card_number"),
    value: `•••• •••• •••• ${activePaymentDetail.paymentMethodSpecificParams.lastCardFourDigits || ""}`,
    editing: false
  }), /* @__PURE__ */ React.createElement("div", {
    className: styles.cardDetails
  }, /* @__PURE__ */ React.createElement(TextField, {
    label: t("user:payment.expiry_date"),
    value: activePaymentDetail.paymentMethodSpecificParams.cardExpirationDate,
    editing: false
  }), /* @__PURE__ */ React.createElement(TextField, {
    label: t("user:payment.cvc_cvv"),
    value: "******",
    editing: false
  }))) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, !isLoading && t("user:payment.no_payment_methods")))), /* @__PURE__ */ React.createElement("div", {
    className: panelClassName
  }, /* @__PURE__ */ React.createElement("div", {
    className: panelHeaderClassName
  }, /* @__PURE__ */ React.createElement("h3", null, t("user:payment.transactions"))), transactions?.length ? /* @__PURE__ */ React.createElement(React.Fragment, null, transactions?.slice(0, showAllTransactions ? 9999 : VISIBLE_TRANSACTIONS).map((transaction) => /* @__PURE__ */ React.createElement("div", {
    className: styles.infoBox,
    key: transaction.transactionId
  }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, transaction.offerTitle), " ", /* @__PURE__ */ React.createElement("br", null), t("user:payment.price_payed_with", {
    price: formatPrice(parseInt(transaction.transactionPriceInclTax), transaction.transactionCurrency, transaction.customerCountry),
    method: transaction.paymentMethod
  })), /* @__PURE__ */ React.createElement("p", null, transaction.transactionId, /* @__PURE__ */ React.createElement("br", null), formatDate(transaction.transactionDate)))), !showAllTransactions && hasMoreTransactions ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, t("user:payment.hidden_transactions", {count: hiddenTransactionsCount})), /* @__PURE__ */ React.createElement(Button, {
    label: t("user:payment.show_all"),
    onClick: onShowAllTransactionsClick
  })) : null) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, !isLoading && t("user:payment.no_transactions")))), isLoading && /* @__PURE__ */ React.createElement(LoadingOverlay, {
    inline: true
  }));
};
export default Payment;
