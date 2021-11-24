import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Button from "../Button/Button.js";
import useCountdown from "../../hooks/useCountdown.js";
import styles from "./Welcome.module.css.proxy.js";
const Welcome = ({onCloseButtonClick, onCountdownCompleted, siteName}) => {
  const {t} = useTranslation("account");
  const countdown = useCountdown(10, 1, onCountdownCompleted);
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.welcome
  }, /* @__PURE__ */ React.createElement("h2", null, t("checkout.welcome_title", {siteName})), /* @__PURE__ */ React.createElement("p", null, t("checkout.welcome_description", {siteName})), /* @__PURE__ */ React.createElement(Button, {
    variant: "contained",
    color: "primary",
    label: t("checkout.start_watching", {countdown}),
    onClick: onCloseButtonClick,
    size: "large",
    fullWidth: true
  }));
};
export default Welcome;
