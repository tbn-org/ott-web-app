import React, {useEffect, useState} from "../../../_snowpack/pkg/react.js";
import {useHistory} from "../../../_snowpack/pkg/react-router.js";
import Dialog from "../../components/Dialog/Dialog.js";
import useQueryParam from "../../hooks/useQueryParam.js";
import {addQueryParam, removeQueryParam} from "../../utils/history.js";
import PaymentFailed from "../../components/PaymentFailed/PaymentFailed.js";
import Welcome from "../../components/Welcome/Welcome.js";
import {AccountStore} from "../../stores/AccountStore.js";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay.js";
import {ConfigStore} from "../../stores/ConfigStore.js";
import styles from "./AccountModal.module.css.proxy.js";
import Login from "./forms/Login.js";
import Registration from "./forms/Registration.js";
import PersonalDetails from "./forms/PersonalDetails.js";
import ChooseOffer from "./forms/ChooseOffer.js";
import Checkout from "./forms/Checkout.js";
import ResetPassword from "./forms/ResetPassword.js";
import CancelSubscription from "./forms/CancelSubscription.js";
import RenewSubscription from "./forms/RenewSubscription.js";
import EditPassword from "./forms/EditPassword.js";
const PUBLIC_VIEWS = ["login", "create-account", "forgot-password", "reset-password", "send-confirmation", "edit-password"];
const AccountModal = () => {
  const history = useHistory();
  const viewParam = useQueryParam("u");
  const [view, setView] = useState(viewParam);
  const message = useQueryParam("message");
  const {loading, auth} = AccountStore.useState((s) => s);
  const config = ConfigStore.useState((s) => s.config);
  const {
    assets: {banner},
    siteName
  } = config;
  const isPublicView = viewParam && PUBLIC_VIEWS.includes(viewParam);
  useEffect(() => {
    if (viewParam)
      setView(viewParam);
  }, [viewParam]);
  useEffect(() => {
    if (!!viewParam && !loading && !auth && !isPublicView) {
      history.push(addQueryParam(history, "u", "login"));
    }
  }, [viewParam, history, loading, auth, isPublicView]);
  const closeHandler = () => {
    history.push(removeQueryParam(history, "u"));
  };
  const renderForm = () => {
    if (!auth && loading && !isPublicView) {
      return /* @__PURE__ */ React.createElement("div", {
        style: {height: 300}
      }, /* @__PURE__ */ React.createElement(LoadingOverlay, {
        inline: true
      }));
    }
    switch (view) {
      case "login":
        return /* @__PURE__ */ React.createElement(Login, null);
      case "create-account":
        return /* @__PURE__ */ React.createElement(Registration, null);
      case "personal-details":
        return /* @__PURE__ */ React.createElement(PersonalDetails, null);
      case "choose-offer":
        return /* @__PURE__ */ React.createElement(ChooseOffer, null);
      case "checkout":
        return /* @__PURE__ */ React.createElement(Checkout, null);
      case "paypal-error":
        return /* @__PURE__ */ React.createElement(PaymentFailed, {
          type: "error",
          message,
          onCloseButtonClick: closeHandler
        });
      case "paypal-cancelled":
        return /* @__PURE__ */ React.createElement(PaymentFailed, {
          type: "cancelled",
          onCloseButtonClick: closeHandler
        });
      case "welcome":
        return /* @__PURE__ */ React.createElement(Welcome, {
          onCloseButtonClick: closeHandler,
          onCountdownCompleted: closeHandler,
          siteName
        });
      case "reset-password":
        return /* @__PURE__ */ React.createElement(ResetPassword, {
          type: "reset"
        });
      case "forgot-password":
        return /* @__PURE__ */ React.createElement(ResetPassword, {
          type: "forgot"
        });
      case "send-confirmation":
        return /* @__PURE__ */ React.createElement(ResetPassword, {
          type: "confirmation"
        });
      case "edit-password":
        return /* @__PURE__ */ React.createElement(EditPassword, null);
      case "unsubscribe":
        return /* @__PURE__ */ React.createElement(CancelSubscription, null);
      case "renew-subscription":
        return /* @__PURE__ */ React.createElement(RenewSubscription, null);
    }
  };
  return /* @__PURE__ */ React.createElement(Dialog, {
    open: !!viewParam,
    onClose: closeHandler
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.banner
  }, banner ? /* @__PURE__ */ React.createElement("img", {
    src: banner,
    alt: ""
  }) : null), renderForm());
};
export default AccountModal;
