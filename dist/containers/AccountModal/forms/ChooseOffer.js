import React, {useEffect} from "../../../../_snowpack/pkg/react.js";
import {object, mixed} from "../../../../_snowpack/pkg/yup.js";
import {useTranslation} from "../../../../_snowpack/pkg/react-i18next.js";
import {useQuery} from "../../../../_snowpack/pkg/react-query.js";
import {useHistory} from "../../../../_snowpack/pkg/react-router.js";
import useForm from "../../../hooks/useForm.js";
import ChooseOfferForm from "../../../components/ChooseOfferForm/ChooseOfferForm.js";
import {getOffer} from "../../../services/checkout.service.js";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay.js";
import {CheckoutStore} from "../../../stores/CheckoutStore.js";
import {addQueryParam, removeQueryParam} from "../../../utils/history.js";
import {ConfigStore} from "../../../stores/ConfigStore.js";
const ChooseOffer = () => {
  const history = useHistory();
  const {t} = useTranslation("account");
  const config = ConfigStore.useState((s) => s.config);
  const {cleengSandbox, json} = config;
  const accessModel = ConfigStore.useState((s) => s.accessModel);
  const hasOffer = accessModel === "SVOD";
  const offer = CheckoutStore.useState((s) => s.offer);
  const cleengMonthlyOffer = json?.cleengMonthlyOffer;
  const cleengYearlyOffer = json?.cleengYearlyOffer;
  const {data: monthlyOfferData} = useQuery(["offer", cleengMonthlyOffer], () => getOffer({offerId: cleengMonthlyOffer}, cleengSandbox));
  const {data: yearlyOfferData} = useQuery(["offer", cleengYearlyOffer], () => getOffer({offerId: cleengYearlyOffer}, cleengSandbox));
  useEffect(() => {
    if (!hasOffer)
      history.replace(removeQueryParam(history, "u"));
  }, [hasOffer, history]);
  const chooseOfferSubmitHandler = async (formData, {setSubmitting, setErrors}) => {
    const offer2 = formData.periodicity === "monthly" ? monthlyOfferData?.responseData : yearlyOfferData?.responseData;
    if (!offer2) {
      return setErrors({form: t("choose_offer.offer_not_found")});
    }
    CheckoutStore.update((s) => {
      s.offer = offer2;
    });
    history.push(addQueryParam(history, "u", "checkout"));
    setSubmitting(false);
  };
  const validationSchema = object().shape({
    periodicity: mixed().required(t("choose_offer.field_required"))
  });
  const initialValues = {periodicity: offer?.period === "month" ? "monthly" : "yearly"};
  const {handleSubmit, handleChange, values, errors, submitting} = useForm(initialValues, chooseOfferSubmitHandler, validationSchema);
  if (!hasOffer || !monthlyOfferData?.responseData || !yearlyOfferData?.responseData) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {height: 300}
    }, /* @__PURE__ */ React.createElement(LoadingOverlay, {
      inline: true
    }));
  }
  return /* @__PURE__ */ React.createElement(ChooseOfferForm, {
    onSubmit: handleSubmit,
    onChange: handleChange,
    values,
    errors,
    submitting,
    monthlyOffer: monthlyOfferData.responseData,
    yearlyOffer: yearlyOfferData.responseData
  });
};
export default ChooseOffer;
