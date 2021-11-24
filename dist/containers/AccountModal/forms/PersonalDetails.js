import React, {useCallback, useEffect, useMemo, useState} from "../../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../../../../_snowpack/pkg/react-router.js";
import {mixed, object, string} from "../../../../_snowpack/pkg/yup.js";
import {useQuery} from "../../../../_snowpack/pkg/react-query.js";
import PersonalDetailsForm from "../../../components/PersonalDetailsForm/PersonalDetailsForm.js";
import useForm from "../../../hooks/useForm.js";
import {addQueryParam} from "../../../utils/history.js";
import {getCaptureStatus, updateCaptureAnswers} from "../../../stores/AccountStore.js";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay.js";
import {ConfigStore} from "../../../stores/ConfigStore.js";
const yupConditional = (required, message) => {
  return required ? string().required(message) : mixed().notRequired();
};
const PersonalDetails = () => {
  const history = useHistory();
  const {t} = useTranslation("account");
  const accessModel = ConfigStore.useState((s) => s.accessModel);
  const {data, isLoading} = useQuery("captureStatus", () => getCaptureStatus());
  const [questionValues, setQuestionValues] = useState({});
  const [questionErrors, setQuestionErrors] = useState({});
  const fields = useMemo(() => Object.fromEntries(data?.settings.map((item) => [item.key, item]) || []), [data]);
  const questions = useMemo(() => data?.settings.filter((item) => !!item.question) || [], [data]);
  const nextStep = useCallback(() => {
    history.replace(addQueryParam(history, "u", accessModel === "SVOD" ? "choose-offer" : "welcome"));
  }, [history, accessModel]);
  useEffect(() => {
    if (data && (!data.isCaptureEnabled || !data.shouldCaptureBeDisplayed))
      nextStep();
    if (data && questions) {
      setQuestionValues(Object.fromEntries(questions.map((question) => [question.key, ""])));
    }
  }, [data, nextStep, questions]);
  const initialValues = {
    firstName: "",
    lastName: "",
    birthDate: "",
    companyName: "",
    phoneNumber: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    postCode: "",
    country: ""
  };
  const questionChangeHandler = (event) => {
    const value = event.target.type === "checkbox" && !event.target.checked ? "" : event.target.value;
    setQuestionValues((current) => ({...current, [event.target.name]: value}));
  };
  const PersonalDetailSubmitHandler = async (formData, {setErrors, setSubmitting, validate}) => {
    const requiredMessage = t("personal_details.this_field_is_required");
    const schema = object().shape({
      firstName: yupConditional(!!fields.firstNameLastName?.required, requiredMessage),
      lastName: yupConditional(!!fields.firstNameLastName?.required, requiredMessage),
      address1: yupConditional(!!fields.address?.required, requiredMessage),
      address2: yupConditional(!!fields.address?.required, requiredMessage),
      postCode: yupConditional(!!fields.address?.required, requiredMessage),
      state: yupConditional(!!fields.address?.required, requiredMessage),
      city: yupConditional(!!fields.address?.required, requiredMessage),
      companyName: yupConditional(!!fields.companyName?.required, requiredMessage),
      birthDate: fields.birthDate?.required ? string().required(requiredMessage).matches(/\d{4}-\d{2}-\d{2}/, t("personal_details.birth_date_not_valid")) : mixed().notRequired(),
      phoneNumber: yupConditional(!!fields.phoneNumber?.required, requiredMessage)
    });
    const errors2 = {};
    questions.forEach((question) => {
      if (question.enabled && question.required && !questionValues[question.key]) {
        errors2[question.key] = t("personal_details.this_field_is_required");
      }
    });
    setQuestionErrors(errors2);
    if (!validate(schema) || Object.keys(errors2).length) {
      setSubmitting(false);
      return;
    }
    try {
      const removeEmpty = (obj) => Object.fromEntries(Object.keys(obj).filter((key) => obj[key] !== "").map((key) => [key, obj[key]]));
      const customAnswers = questions.map((question) => ({question: question.question, questionId: question.key, value: questionValues[question.key]}));
      await updateCaptureAnswers(removeEmpty({...formData, customAnswers}));
      nextStep();
    } catch (error) {
      if (error instanceof Error) {
        setErrors({form: error.message});
      }
    }
    setSubmitting(false);
  };
  const {setValue, handleSubmit, handleChange, values, errors, submitting} = useForm(initialValues, PersonalDetailSubmitHandler);
  if (isLoading) {
    return /* @__PURE__ */ React.createElement("div", {
      style: {height: 400}
    }, /* @__PURE__ */ React.createElement(LoadingOverlay, {
      inline: true
    }));
  }
  return /* @__PURE__ */ React.createElement(PersonalDetailsForm, {
    fields,
    questions,
    onQuestionChange: questionChangeHandler,
    questionValues,
    questionErrors,
    onSubmit: handleSubmit,
    onChange: handleChange,
    setValue,
    values,
    errors,
    submitting
  });
};
export default PersonalDetails;
