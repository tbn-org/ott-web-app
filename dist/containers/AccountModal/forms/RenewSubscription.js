import React, {useState} from "../../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../../../../_snowpack/pkg/react-router.js";
import {removeQueryParam} from "../../../utils/history.js";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay.js";
import {AccountStore, updateSubscription} from "../../../stores/AccountStore.js";
import RenewSubscriptionForm from "../../../components/RenewSubscriptionForm/RenewSubscriptionForm.js";
import SubscriptionRenewed from "../../../components/SubscriptionRenewed/SubscriptionRenewed.js";
const RenewSubscription = () => {
  const {t} = useTranslation("account");
  const history = useHistory();
  const {subscription, user} = AccountStore.useState((s) => s);
  const [renewed, setRenewed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const renewSubscriptionConfirmHandler = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await updateSubscription("active");
      setRenewed(true);
    } catch (error2) {
      setError(t("renew_subscription.unknown_error_occurred"));
    }
    setSubmitting(false);
  };
  const closeHandler = () => {
    history.replace(removeQueryParam(history, "u"));
  };
  if (!subscription || !user)
    return null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, renewed ? /* @__PURE__ */ React.createElement(SubscriptionRenewed, {
    onClose: closeHandler,
    subscription,
    customer: user
  }) : /* @__PURE__ */ React.createElement(RenewSubscriptionForm, {
    subscription,
    customer: user,
    error,
    onConfirm: renewSubscriptionConfirmHandler,
    onClose: closeHandler,
    submitting
  }), submitting ? /* @__PURE__ */ React.createElement(LoadingOverlay, {
    inline: true
  }) : null);
};
export default RenewSubscription;
