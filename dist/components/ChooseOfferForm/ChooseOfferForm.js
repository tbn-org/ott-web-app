import React, {useContext} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Button from "../Button/Button.js";
import CheckCircle from "../../icons/CheckCircle.js";
import {ConfigContext} from "../../providers/ConfigProvider.js";
import FormFeedback from "../FormFeedback/FormFeedback.js";
import {getOfferPrice} from "../../utils/subscription.js";
import DialogBackButton from "../DialogBackButton/DialogBackButton.js";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.js";
import styles from "./ChooseOfferForm.module.css.proxy.js";
const ChooseOfferForm = ({
  values,
  errors,
  onChange,
  onSubmit,
  submitting,
  yearlyOffer,
  monthlyOffer,
  onBackButtonClickHandler
}) => {
  const {siteName} = useContext(ConfigContext);
  const {t} = useTranslation("account");
  const getFreeTrialText = (offer) => {
    if (offer.freeDays > 0) {
      return t("choose_offer.benefits.first_days_free", {count: offer.freeDays});
    } else if (offer.freePeriods) {
      const period = t(`periods.${offer.period}`, {count: offer.freePeriods});
      return t("choose_offer.benefits.first_periods_free", {count: offer.freePeriods, period});
    }
    return null;
  };
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit,
    "data-testid": "choose-offer-form",
    noValidate: true
  }, onBackButtonClickHandler ? /* @__PURE__ */ React.createElement(DialogBackButton, {
    onClick: onBackButtonClickHandler
  }) : null, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, t("choose_offer.subscription")), /* @__PURE__ */ React.createElement("h3", {
    className: styles.subtitle
  }, t("choose_offer.all_movies_and_series_of_platform", {siteName})), errors.form ? /* @__PURE__ */ React.createElement(FormFeedback, {
    variant: "error"
  }, errors.form) : null, /* @__PURE__ */ React.createElement("div", {
    className: styles.offers
  }, monthlyOffer ? /* @__PURE__ */ React.createElement("div", {
    className: styles.offer
  }, /* @__PURE__ */ React.createElement("input", {
    className: styles.radio,
    onChange,
    type: "radio",
    name: "periodicity",
    value: "monthly",
    id: "monthly",
    checked: values.periodicity === "monthly",
    "aria-label": t("choose_offer.monthly_subscription")
  }), /* @__PURE__ */ React.createElement("label", {
    className: styles.label,
    htmlFor: "monthly"
  }, /* @__PURE__ */ React.createElement("h4", {
    className: styles.offerTitle
  }, t("choose_offer.monthly")), /* @__PURE__ */ React.createElement("hr", {
    className: styles.offerDivider
  }), /* @__PURE__ */ React.createElement("ul", {
    className: styles.offerBenefits
  }, monthlyOffer.freeDays > 0 || monthlyOffer.freePeriods > 0 ? /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(CheckCircle, null), " ", getFreeTrialText(monthlyOffer)) : null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(CheckCircle, null), " ", t("choose_offer.benefits.cancel_anytime")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(CheckCircle, null), " ", t("choose_offer.benefits.watch_on_all_devices"))), /* @__PURE__ */ React.createElement("div", {
    className: styles.fill
  }), /* @__PURE__ */ React.createElement("div", {
    className: styles.offerPrice
  }, getOfferPrice(monthlyOffer), " ", /* @__PURE__ */ React.createElement("small", null, "/", t("periods.month"))))) : null, yearlyOffer ? /* @__PURE__ */ React.createElement("div", {
    className: styles.offer
  }, /* @__PURE__ */ React.createElement("input", {
    className: styles.radio,
    onChange,
    type: "radio",
    name: "periodicity",
    value: "yearly",
    id: "yearly",
    checked: values.periodicity === "yearly",
    "aria-label": t("choose_offer.yearly_subscription")
  }), /* @__PURE__ */ React.createElement("label", {
    className: styles.label,
    htmlFor: "yearly"
  }, /* @__PURE__ */ React.createElement("h4", {
    className: styles.offerTitle
  }, t("choose_offer.yearly")), /* @__PURE__ */ React.createElement("hr", {
    className: styles.offerDivider
  }), /* @__PURE__ */ React.createElement("ul", {
    className: styles.offerBenefits
  }, yearlyOffer.freeDays > 0 || yearlyOffer.freePeriods > 0 ? /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(CheckCircle, null), " ", getFreeTrialText(yearlyOffer)) : null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(CheckCircle, null), " ", t("choose_offer.benefits.cancel_anytime")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(CheckCircle, null), " ", t("choose_offer.benefits.watch_on_all_devices"))), /* @__PURE__ */ React.createElement("div", {
    className: styles.fill
  }), /* @__PURE__ */ React.createElement("div", {
    className: styles.offerPrice
  }, getOfferPrice(yearlyOffer), " ", /* @__PURE__ */ React.createElement("small", null, "/", t("periods.year"))))) : null), submitting && /* @__PURE__ */ React.createElement(LoadingOverlay, {
    transparentBackground: true,
    inline: true
  }), /* @__PURE__ */ React.createElement(Button, {
    label: t("choose_offer.continue"),
    disabled: submitting,
    variant: "contained",
    color: "primary",
    type: "submit",
    fullWidth: true
  }));
};
export default ChooseOfferForm;
