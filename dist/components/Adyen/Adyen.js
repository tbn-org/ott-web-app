import React, {useEffect, useRef, useState} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {addScript, addStyleSheet} from "../../utils/dom.js";
import useOpaqueId from "../../hooks/useOpaqueId.js";
import Button from "../Button/Button.js";
import FormFeedback from "../FormFeedback/FormFeedback.js";
import {ADYEN_LIVE_CLIENT_KEY, ADYEN_TEST_CLIENT_KEY} from "../../config.js";
import styles from "./Adyen.module.css.proxy.js";
import "./AdyenForm.css.proxy.js";
const Adyen = ({onChange, onSubmit, error, environment = "test"}) => {
  const {t} = useTranslation("account");
  const id = useOpaqueId("adyen", "checkout");
  const adyenRef = useRef(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(!!window.AdyenCheckout);
  useEffect(() => {
    const loadExternalScripts = async () => {
      await Promise.all([
        addScript(`https://checkoutshopper-${environment}.adyen.com/checkoutshopper/sdk/3.10.1/adyen.js`),
        addStyleSheet(`https://checkoutshopper-${environment}.adyen.com/checkoutshopper/sdk/3.11.4/adyen.css`)
      ]);
      setScriptsLoaded(true);
    };
    loadExternalScripts();
  }, [environment]);
  useEffect(() => {
    if (scriptsLoaded) {
      const configuration = {
        showPayButton: false,
        clientKey: environment === "test" ? ADYEN_TEST_CLIENT_KEY : ADYEN_LIVE_CLIENT_KEY,
        environment,
        onSubmit,
        onChange
      };
      adyenRef.current = new window.AdyenCheckout(configuration).create("card").mount(`#${id}`);
      return () => {
        if (adyenRef.current) {
          adyenRef.current.unmount();
        }
      };
    }
  }, [environment, id, onChange, onSubmit, scriptsLoaded]);
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.adyen
  }, error ? /* @__PURE__ */ React.createElement(FormFeedback, {
    variant: "error"
  }, error) : null, /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement("div", {
    id
  })), /* @__PURE__ */ React.createElement(Button, {
    label: t("checkout.continue"),
    variant: "contained",
    color: "primary",
    size: "large",
    onClick: () => adyenRef.current?.submit(),
    fullWidth: true
  }));
};
export default Adyen;
