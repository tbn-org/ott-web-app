import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Button from "../Button/Button.js";
import FormFeedback from "../FormFeedback/FormFeedback.js";
import styles from "./NoPaymentRequired.module.css.proxy.js";
const NoPaymentRequired = ({onSubmit, error}) => {
  const {t} = useTranslation("account");
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.noPaymentRequired
  }, error ? /* @__PURE__ */ React.createElement(FormFeedback, {
    variant: "error"
  }, error) : null, /* @__PURE__ */ React.createElement("p", null, t("checkout.no_payment_needed")), /* @__PURE__ */ React.createElement(Button, {
    label: t("checkout.continue"),
    variant: "contained",
    color: "primary",
    size: "large",
    onClick: onSubmit,
    fullWidth: true
  }));
};
export default NoPaymentRequired;
