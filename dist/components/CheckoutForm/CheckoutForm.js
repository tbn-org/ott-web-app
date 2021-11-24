import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Button from "../Button/Button.js";
import IconButton from "../IconButton/IconButton.js";
import FormFeedback from "../FormFeedback/FormFeedback.js";
import {formatPrice} from "../../utils/formatting.js";
import Close from "../../icons/Close.js";
import DialogBackButton from "../DialogBackButton/DialogBackButton.js";
import PayPal from "../../icons/PayPal.js";
import CreditCard from "../../icons/CreditCard.js";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.js";
import styles from "./CheckoutForm.module.css.proxy.js";
const CheckoutForm = ({
  paymentMethodId,
  paymentMethods,
  order,
  offer,
  onBackButtonClick,
  onPaymentMethodChange,
  couponFormOpen,
  couponInputValue,
  couponFormError,
  couponFormApplied,
  couponFormSubmitting,
  onCouponInputChange,
  onCloseCouponFormClick,
  onCouponFormSubmit,
  onRedeemCouponButtonClick,
  renderPaymentMethod,
  submitting
}) => {
  const {t} = useTranslation("account");
  const getOfferPeriod = () => {
    return offer ? t(`periods.${offer.period}`) : "";
  };
  const getFreeTrialText = (offer2) => {
    if (offer2.freeDays > 0) {
      return t("checkout.days_trial", {count: offer2.freeDays});
    } else if (offer2.freePeriods) {
      const period = t(`periods.${offer2.period}`, {count: offer2.freePeriods});
      return t("checkout.periods_trial", {count: offer2.freePeriods, period});
    }
    return null;
  };
  const cardPaymentMethod = paymentMethods?.find((method) => method.methodName === "card");
  const paypalPaymentMethod = paymentMethods?.find((method) => method.methodName === "paypal");
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(DialogBackButton, {
    onClick: onBackButtonClick
  }), /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, t("checkout.payment_method")), /* @__PURE__ */ React.createElement("div", {
    className: styles.order
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.orderInfo
  }, /* @__PURE__ */ React.createElement("p", {
    className: styles.orderTitle
  }, offer.period === "month" ? t("checkout.monthly") : t("checkout.yearly")), order.discount.type === "trial" ? /* @__PURE__ */ React.createElement("p", {
    className: styles.orderBillingDate
  }, getFreeTrialText(offer)) : null), /* @__PURE__ */ React.createElement("div", {
    className: styles.orderPrice
  }, /* @__PURE__ */ React.createElement("span", null, formatPrice(offer.customerPriceInclTax, order.currency, offer.customerCountry)), /* @__PURE__ */ React.createElement("small", null, "/", getOfferPeriod()))), /* @__PURE__ */ React.createElement("div", {
    className: styles.couponForm
  }, couponFormOpen ? /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCouponFormSubmit,
    noValidate: true
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.redeemCoupon
  }, /* @__PURE__ */ React.createElement(IconButton, {
    "aria-label": "Close coupon form",
    onClick: onCloseCouponFormClick
  }, /* @__PURE__ */ React.createElement(Close, null)), /* @__PURE__ */ React.createElement("input", {
    className: styles.couponInput,
    name: "couponCode",
    type: "text",
    placeholder: "Coupon code",
    value: couponInputValue,
    onChange: onCouponInputChange
  }), /* @__PURE__ */ React.createElement(Button, {
    variant: "outlined",
    label: "Apply",
    type: "submit",
    disabled: couponFormSubmitting
  })), couponFormError ? /* @__PURE__ */ React.createElement(FormFeedback, {
    variant: "error"
  }, couponFormError) : null, couponFormApplied ? /* @__PURE__ */ React.createElement(FormFeedback, {
    variant: "success"
  }, t("checkout.coupon_applied")) : null) : /* @__PURE__ */ React.createElement(Button, {
    variant: "outlined",
    label: t("checkout.redeem_coupon"),
    onClick: onRedeemCouponButtonClick
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("table", {
    className: styles.orderTotals
  }, /* @__PURE__ */ React.createElement("tbody", null, order.discount.applied && order.discount.type === "coupon" ? /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
    className: styles.couponCell
  }, t("checkout.coupon_discount"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("small", null, "(", t("checkout.discount_period", {
    count: order.discount.periods,
    period: t(`periods.${offer.period}`, {count: order.discount.periods})
  }), ")")), /* @__PURE__ */ React.createElement("td", null, formatPrice(-order.priceBreakdown.discountAmount * (1 + order.taxRate), order.currency, offer.customerCountry))) : null, order.discount.applied && order.discount.type === "trial" ? /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", {
    className: styles.couponCell
  }, t("checkout.free_trial_discount")), /* @__PURE__ */ React.createElement("td", null, formatPrice(-offer.customerPriceInclTax, order.currency, offer.customerCountry))) : null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, t("checkout.payment_method_fee")), /* @__PURE__ */ React.createElement("td", null, formatPrice(order.priceBreakdown.paymentMethodFee, order.currency, offer.customerCountry)))), /* @__PURE__ */ React.createElement("tfoot", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, t("checkout.total_price")), /* @__PURE__ */ React.createElement("td", null, formatPrice(order.totalPrice, order.currency, offer.customerCountry))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, t("checkout.applicable_tax", {taxRate: Math.round(order.taxRate * 100)})), /* @__PURE__ */ React.createElement("td", null, formatPrice(order.priceBreakdown.taxValue, order.currency, offer.customerCountry)))))), /* @__PURE__ */ React.createElement("hr", {
    className: styles.divider
  }), order.requiredPaymentDetails ? /* @__PURE__ */ React.createElement("div", {
    className: styles.paymentMethods
  }, cardPaymentMethod ? /* @__PURE__ */ React.createElement("div", {
    className: styles.paymentMethod
  }, /* @__PURE__ */ React.createElement("input", {
    className: styles.radio,
    type: "radio",
    name: "paymentMethod",
    value: cardPaymentMethod.id,
    id: "card",
    checked: paymentMethodId === cardPaymentMethod.id,
    onChange: onPaymentMethodChange
  }), /* @__PURE__ */ React.createElement("label", {
    className: styles.paymentMethodLabel,
    htmlFor: "card"
  }, /* @__PURE__ */ React.createElement(CreditCard, null), " ", t("checkout.credit_card"))) : null, paypalPaymentMethod ? /* @__PURE__ */ React.createElement("div", {
    className: styles.paymentMethod
  }, /* @__PURE__ */ React.createElement("input", {
    className: styles.radio,
    type: "radio",
    name: "paymentMethod",
    value: paypalPaymentMethod.id,
    id: "paypal",
    checked: paymentMethodId === paypalPaymentMethod.id,
    onChange: onPaymentMethodChange
  }), /* @__PURE__ */ React.createElement("label", {
    className: styles.paymentMethodLabel,
    htmlFor: "paypal"
  }, /* @__PURE__ */ React.createElement(PayPal, null), " ", t("checkout.paypal"))) : null) : null, /* @__PURE__ */ React.createElement("div", {
    className: styles.paymentDetails
  }, renderPaymentMethod ? renderPaymentMethod() : null), submitting && /* @__PURE__ */ React.createElement(LoadingOverlay, {
    transparentBackground: true,
    inline: true
  }));
};
export default CheckoutForm;
