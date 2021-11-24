import React, {useCallback, useEffect, useState} from "../../../../_snowpack/pkg/react.js";
import {useHistory} from "../../../../_snowpack/pkg/react-router.js";
import {useTranslation} from "../../../../_snowpack/pkg/react-i18next.js";
import CheckoutForm from "../../../components/CheckoutForm/CheckoutForm.js";
import {
  CheckoutStore,
  createOrder,
  updateOrder,
  getPaymentMethods,
  paymentWithoutDetails,
  adyenPayment,
  paypalPayment
} from "../../../stores/CheckoutStore.js";
import {addQueryParam} from "../../../utils/history.js";
import useForm from "../../../hooks/useForm.js";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay.js";
import Adyen from "../../../components/Adyen/Adyen.js";
import PayPal from "../../../components/PayPal/PayPal.js";
import NoPaymentRequired from "../../../components/NoPaymentRequired/NoPaymentRequired.js";
import {addQueryParams} from "../../../utils/formatting.js";
import {reloadActiveSubscription} from "../../../stores/AccountStore.js";
import {ConfigStore} from "../../../stores/ConfigStore.js";
const Checkout = () => {
  const {cleengSandbox} = ConfigStore.useState((s) => s.config);
  const {t} = useTranslation("account");
  const history = useHistory();
  const [paymentError, setPaymentError] = useState(void 0);
  const [updatingOrder, setUpdatingOrder] = useState(false);
  const [couponFormOpen, setCouponFormOpen] = useState(false);
  const [couponCodeApplied, setCouponCodeApplied] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState(void 0);
  const {order, offer, paymentMethods} = CheckoutStore.useState((s) => s);
  const couponCodeForm = useForm({couponCode: ""}, async (values, {setSubmitting, setErrors}) => {
    setUpdatingOrder(true);
    setCouponCodeApplied(false);
    if (values.couponCode && order) {
      try {
        await updateOrder(order.id, paymentMethodId, values.couponCode);
        setCouponCodeApplied(true);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes(`Order with id ${order.id} not found`)) {
            history.replace(addQueryParam(history, "u", "choose-offer"));
          } else {
            setErrors({couponCode: t("checkout.coupon_not_valid")});
          }
        }
      }
    }
    setUpdatingOrder(false);
    setSubmitting(false);
  });
  useEffect(() => {
    async function create() {
      if (offer) {
        setUpdatingOrder(true);
        setCouponCodeApplied(false);
        const methods = await getPaymentMethods();
        setPaymentMethodId(methods[0]?.id);
        await createOrder(offer.offerId, methods[0]?.id);
        setUpdatingOrder(false);
      }
    }
    if (!offer) {
      return history.replace(addQueryParam(history, "u", "choose-offer"));
    }
    create();
  }, [history, offer]);
  const backButtonClickHandler = () => {
    history.push(addQueryParam(history, "u", "choose-offer"));
  };
  const handlePaymentMethodChange = (event) => {
    const toPaymentMethodId = parseInt(event.target.value);
    setPaymentMethodId(toPaymentMethodId);
    setPaymentError(void 0);
    if (order && toPaymentMethodId) {
      setUpdatingOrder(true);
      setCouponCodeApplied(false);
      updateOrder(order.id, toPaymentMethodId, couponCodeForm.values.couponCode).catch((error) => {
        if (error.message.includes(`Order with id ${order.id}} not found`)) {
          history.push(addQueryParam(history, "u", "choose-offer"));
        }
      }).finally(() => setUpdatingOrder(false));
    }
  };
  const handleNoPaymentRequiredSubmit = async () => {
    try {
      setUpdatingOrder(true);
      setPaymentError(void 0);
      await paymentWithoutDetails();
      await reloadActiveSubscription();
      history.replace(addQueryParam(history, "u", "welcome"));
    } catch (error) {
      if (error instanceof Error) {
        setPaymentError(error.message);
      }
    }
    setUpdatingOrder(false);
  };
  const handlePayPalSubmit = async () => {
    try {
      setPaymentError(void 0);
      setUpdatingOrder(true);
      const successUrl = addQueryParams(window.location.href, {u: "welcome"});
      const cancelUrl = addQueryParams(window.location.href, {u: "paypal-cancelled"});
      const errorUrl = addQueryParams(window.location.href, {u: "paypal-error"});
      const response = await paypalPayment(successUrl, cancelUrl, errorUrl);
      if (response.redirectUrl) {
        window.location.href = response.redirectUrl;
      }
    } catch (error) {
      if (error instanceof Error) {
        setPaymentError(error.message);
      }
    }
    setUpdatingOrder(false);
  };
  const handleAdyenSubmit = useCallback(async (data) => {
    if (!data.isValid)
      return;
    try {
      setUpdatingOrder(true);
      setPaymentError(void 0);
      await adyenPayment(data.data.paymentMethod);
      await reloadActiveSubscription();
      history.replace(addQueryParam(history, "u", "welcome"));
    } catch (error) {
      if (error instanceof Error) {
        setPaymentError(error.message);
      }
    }
    setUpdatingOrder(false);
  }, [history]);
  const renderPaymentMethod = () => {
    const paymentMethod = paymentMethods?.find((method) => method.id === paymentMethodId);
    if (!order || !offer)
      return null;
    if (!order.requiredPaymentDetails) {
      return /* @__PURE__ */ React.createElement(NoPaymentRequired, {
        onSubmit: handleNoPaymentRequiredSubmit,
        error: paymentError
      });
    }
    if (paymentMethod?.methodName === "card") {
      return /* @__PURE__ */ React.createElement(Adyen, {
        onSubmit: handleAdyenSubmit,
        error: paymentError,
        environment: cleengSandbox ? "test" : "live"
      });
    } else if (paymentMethod?.methodName === "paypal") {
      return /* @__PURE__ */ React.createElement(PayPal, {
        onSubmit: handlePayPalSubmit,
        error: paymentError
      });
    }
    return null;
  };
  if (!offer || !order || !paymentMethods) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {height: 300}
    }, /* @__PURE__ */ React.createElement(LoadingOverlay, {
      inline: true
    }));
  }
  return /* @__PURE__ */ React.createElement(CheckoutForm, {
    order,
    offer,
    onBackButtonClick: backButtonClickHandler,
    paymentMethods,
    paymentMethodId,
    onPaymentMethodChange: handlePaymentMethodChange,
    onCouponFormSubmit: couponCodeForm.handleSubmit,
    onCouponInputChange: couponCodeForm.handleChange,
    onRedeemCouponButtonClick: () => setCouponFormOpen(true),
    onCloseCouponFormClick: () => setCouponFormOpen(false),
    couponInputValue: couponCodeForm.values.couponCode,
    couponFormOpen,
    couponFormApplied: couponCodeApplied,
    couponFormSubmitting: couponCodeForm.submitting,
    couponFormError: couponCodeForm.errors.couponCode,
    renderPaymentMethod,
    submitting: updatingOrder
  });
};
export default Checkout;
