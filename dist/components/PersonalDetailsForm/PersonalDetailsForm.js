import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import TextField from "../TextField/TextField.js";
import Button from "../Button/Button.js";
import Dropdown from "../Dropdown/Dropdown.js";
import Checkbox from "../Checkbox/Checkbox.js";
import Radio from "../Radio/Radio.js";
import DateField from "../DateField/DateField.js";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.js";
import FormFeedback from "../FormFeedback/FormFeedback.js";
import styles from "./PersonalDetailsForm.module.css.proxy.js";
const PersonalDetailsForm = ({
  onSubmit,
  onChange,
  setValue,
  values,
  errors,
  submitting,
  fields,
  questions,
  onQuestionChange,
  questionValues,
  questionErrors
}) => {
  const {t} = useTranslation("account");
  const renderQuestion = ({value, key, question, required}) => {
    const values2 = value?.split(";") || [];
    const props = {
      name: key,
      onChange: onQuestionChange,
      error: !!questionErrors[key],
      helperText: questionErrors[key],
      required,
      key
    };
    if (values2.length === 1) {
      return /* @__PURE__ */ React.createElement(Checkbox, {
        checked: !!questionValues[key],
        value: values2[0],
        header: question,
        label: values2[0],
        ...props
      });
    } else if (values2.length === 2) {
      return /* @__PURE__ */ React.createElement(Radio, {
        values: values2,
        value: questionValues[key],
        header: question,
        ...props
      });
    } else if (values2.length > 2) {
      return /* @__PURE__ */ React.createElement(Dropdown, {
        options: values2,
        value: questionValues[key],
        label: question,
        defaultLabel: t("personal_details.select_answer"),
        ...props,
        fullWidth: true
      });
    }
    return null;
  };
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit,
    "data-testid": "personal_details-form",
    noValidate: true
  }, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, t("personal_details.title")), errors.form ? /* @__PURE__ */ React.createElement(FormFeedback, {
    variant: "error"
  }, errors.form) : null, fields.firstNameLastName?.enabled ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(TextField, {
    value: values.firstName,
    onChange,
    label: t("personal_details.fist_name"),
    placeholder: t("personal_details.fist_name"),
    error: !!errors.firstName || !!errors.form,
    helperText: errors.firstName,
    required: fields.firstNameLastName.required,
    name: "firstName"
  }), /* @__PURE__ */ React.createElement(TextField, {
    value: values.lastName,
    onChange,
    label: t("personal_details.last_name"),
    placeholder: t("personal_details.last_name"),
    error: !!errors.lastName || !!errors.form,
    helperText: errors.lastName,
    required: fields.firstNameLastName.required,
    name: "lastName"
  })) : null, fields.companyName?.enabled ? /* @__PURE__ */ React.createElement(TextField, {
    value: values.companyName,
    onChange,
    label: t("personal_details.company_name"),
    placeholder: t("personal_details.company_name"),
    error: !!errors.companyName || !!errors.form,
    helperText: errors.companyName,
    required: fields.companyName.required,
    name: "companyName"
  }) : null, fields.address?.enabled ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(TextField, {
    value: values.address,
    onChange,
    label: t("personal_details.address"),
    placeholder: t("personal_details.address"),
    error: !!errors.address || !!errors.form,
    helperText: errors.address,
    required: fields.address.required,
    name: "address"
  }), /* @__PURE__ */ React.createElement(TextField, {
    value: values.address2,
    onChange,
    label: t("personal_details.address2"),
    placeholder: t("personal_details.address2"),
    error: !!errors.address2 || !!errors.form,
    helperText: errors.address2,
    name: "address2"
  }), /* @__PURE__ */ React.createElement(TextField, {
    value: values.city,
    onChange,
    label: t("personal_details.city"),
    placeholder: t("personal_details.city"),
    error: !!errors.city || !!errors.form,
    helperText: errors.city,
    required: fields.address.required,
    name: "city"
  }), /* @__PURE__ */ React.createElement(TextField, {
    value: values.state,
    onChange,
    label: t("personal_details.state"),
    placeholder: t("personal_details.state"),
    error: !!errors.state || !!errors.form,
    helperText: errors.state,
    required: fields.address.required,
    name: "state"
  }), /* @__PURE__ */ React.createElement(TextField, {
    value: values.postCode,
    onChange,
    label: t("personal_details.post_code"),
    placeholder: t("personal_details.post_code"),
    error: !!errors.postCode || !!errors.form,
    helperText: errors.postCode,
    required: fields.address.required,
    name: "postCode"
  })) : null, fields.phoneNumber?.enabled ? /* @__PURE__ */ React.createElement(TextField, {
    value: values.phoneNumber,
    onChange,
    label: t("personal_details.phone_number"),
    placeholder: t("personal_details.phone_number"),
    error: !!errors.phoneNumber || !!errors.form,
    helperText: errors.phoneNumber,
    required: fields.phoneNumber.required,
    name: "phoneNumber"
  }) : null, fields.birthDate?.enabled ? /* @__PURE__ */ React.createElement(DateField, {
    value: values.birthDate,
    onChange: (value) => setValue("birthDate", value),
    label: t("personal_details.birth_date"),
    placeholder: t("personal_details.birth_date"),
    error: !!errors.birthDate || !!errors.form,
    helperText: errors.birthDate,
    required: fields.birthDate.required,
    name: "birthDate"
  }) : null, questions.map((question) => renderQuestion(question)), /* @__PURE__ */ React.createElement(Button, {
    className: styles.continue,
    type: "submit",
    label: t("personal_details.continue"),
    variant: "contained",
    color: "primary",
    size: "large",
    disabled: submitting,
    fullWidth: true
  }), submitting && /* @__PURE__ */ React.createElement(LoadingOverlay, {
    transparentBackground: true,
    inline: true
  }));
};
export default PersonalDetailsForm;
