import React, {useState} from "../../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../../../../_snowpack/pkg/react-router.js";
import CancelSubscriptionForm from "../../../components/CancelSubscriptionForm/CancelSubscriptionForm.js";
import {removeQueryParam} from "../../../utils/history.js";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay.js";
import {AccountStore, updateSubscription} from "../../../stores/AccountStore.js";
import SubscriptionCancelled from "../../../components/SubscriptionCancelled/SubscriptionCancelled.js";
import {formatDate} from "../../../utils/formatting.js";
const CancelSubscription = () => {
  const {t} = useTranslation("account");
  const history = useHistory();
  const subscription = AccountStore.useState((s) => s.subscription);
  const [cancelled, setCancelled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const cancelSubscriptionConfirmHandler = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await updateSubscription("cancelled");
      setCancelled(true);
    } catch (error2) {
      setError(t("cancel_subscription.unknown_error_occurred"));
    }
    setSubmitting(false);
  };
  const closeHandler = () => {
    history.replace(removeQueryParam(history, "u"));
  };
  if (!subscription)
    return null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, cancelled ? /* @__PURE__ */ React.createElement(SubscriptionCancelled, {
    expiresDate: formatDate(subscription.expiresAt),
    onClose: closeHandler
  }) : /* @__PURE__ */ React.createElement(CancelSubscriptionForm, {
    onConfirm: cancelSubscriptionConfirmHandler,
    onCancel: closeHandler,
    submitting,
    error
  }), submitting ? /* @__PURE__ */ React.createElement(LoadingOverlay, {
    transparentBackground: true,
    inline: true
  }) : null);
};
export default CancelSubscription;
