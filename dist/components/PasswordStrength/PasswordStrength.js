import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import styles from "./PasswordStrength.module.css.proxy.js";
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,}$/;
const PasswordStrength = ({password}) => {
  const {t} = useTranslation("account");
  const passwordStrength = (password2) => {
    let strength2 = 0;
    if (!password2.match(PASSWORD_REGEX))
      return strength2;
    if (password2.match(/[A-Z]+/)) {
      strength2 += 1;
    }
    if (password2.match(/(\d.*\d)/)) {
      strength2 += 1;
    }
    if (password2.match(/[!,@#$%^&*?_~]/)) {
      strength2 += 1;
    }
    if (password2.match(/([!,@#$%^&*?_~].*[!,@#$%^&*?_~])/)) {
      strength2 += 1;
    }
    return strength2;
  };
  const strength = passwordStrength(password);
  const labels = [
    t("registration.password_strength.invalid"),
    t("registration.password_strength.weak"),
    t("registration.password_strength.fair"),
    t("registration.password_strength.strong"),
    t("registration.password_strength.very_strong")
  ];
  if (!strength)
    return null;
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.passwordStrength,
    "data-strength": strength
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.passwordStrengthBar
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.passwordStrengthFill
  })), " ", /* @__PURE__ */ React.createElement("span", {
    className: styles.label
  }, labels[strength]));
};
export default PasswordStrength;
