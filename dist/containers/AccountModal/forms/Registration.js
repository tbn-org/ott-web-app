import React, {useEffect, useMemo, useState} from "../../../../_snowpack/pkg/react.js";
import {object, string} from "../../../../_snowpack/pkg/yup.js";
import {useTranslation} from "../../../../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../../../../_snowpack/pkg/react-router.js";
import {useQuery} from "../../../../_snowpack/pkg/react-query.js";
import {getPublisherConsents} from "../../../services/account.service.js";
import RegistrationForm from "../../../components/RegistrationForm/RegistrationForm.js";
import useForm from "../../../hooks/useForm.js";
import {addQueryParam} from "../../../utils/history.js";
import {ConfigStore} from "../../../stores/ConfigStore.js";
import {extractConsentValues, checkConsentsFromValues} from "../../../utils/collection.js";
import {register, updateConsents} from "../../../stores/AccountStore.js";
const Registration = () => {
  const history = useHistory();
  const {t} = useTranslation("account");
  const {cleengId, cleengSandbox: sandbox} = ConfigStore.useState((s) => s.config);
  const [consentValues, setConsentValues] = useState({});
  const [consentErrors, setConsentErrors] = useState([]);
  const publisherId = cleengId || "";
  const enabled = !!publisherId;
  const getConsents = () => getPublisherConsents({publisherId}, sandbox);
  const {data, isLoading: publisherConsentsLoading} = useQuery(["consents"], getConsents, {enabled});
  const publisherConsents = useMemo(() => data?.responseData?.consents || [], [data]);
  const handleChangeConsent = (event) => {
    setConsentValues((current) => ({...current, [event.target.name]: event.target.checked}));
  };
  useEffect(() => {
    if (publisherConsents) {
      setConsentValues(extractConsentValues(publisherConsents));
    }
  }, [publisherConsents]);
  const registrationSubmitHandler = async ({email, password}, {setErrors, setSubmitting, setValue}) => {
    try {
      const {consentsErrors, customerConsents} = checkConsentsFromValues(publisherConsents, consentValues);
      if (consentsErrors.length) {
        setConsentErrors(consentsErrors);
        setSubmitting(false);
        return;
      }
      await register(email, password);
      await updateConsents(customerConsents).catch(() => {
      });
      history.push(addQueryParam(history, "u", "personal-details"));
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes("customer already exists.")) {
          setErrors({form: t("registration.user_exists")});
        } else if (errorMessage.includes("invalid param password")) {
          setErrors({password: t("registration.invalid_password")});
        }
        setValue("password", "");
      }
    }
    setSubmitting(false);
  };
  const validationSchema = object().shape({
    email: string().email(t("registration.field_is_not_valid_email")).required(t("registration.field_required")),
    password: string().matches(/^(?=.*[a-z])(?=.*[0-9]).{8,}$/, t("registration.invalid_password")).required(t("registration.field_required"))
  });
  const initialRegistrationValues = {email: "", password: ""};
  const {handleSubmit, handleChange, handleBlur, values, errors, submitting} = useForm(initialRegistrationValues, registrationSubmitHandler, validationSchema, true);
  return /* @__PURE__ */ React.createElement(RegistrationForm, {
    onSubmit: handleSubmit,
    onChange: handleChange,
    onBlur: handleBlur,
    values,
    errors,
    consentErrors,
    submitting,
    consentValues,
    publisherConsents,
    loading: publisherConsentsLoading,
    onConsentChange: handleChangeConsent,
    canSubmit: !!values.email && !!values.password
  });
};
export default Registration;
