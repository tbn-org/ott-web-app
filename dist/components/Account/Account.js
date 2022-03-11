import React, {useState, useMemo} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../../../_snowpack/pkg/react-router-dom.js";
import {formatConsentsFromValues, formatConsentValues} from "../../utils/collection.js";
import Visibility from "../../icons/Visibility.js";
import VisibilityOff from "../../icons/VisibilityOff.js";
import useToggle from "../../hooks/useToggle.js";
import Button from "../Button/Button.js";
import Form from "../Form/Form.js";
import IconButton from "../IconButton/IconButton.js";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.js";
import TextField from "../TextField/TextField.js";
import Checkbox from "../Checkbox/Checkbox.js";
import {addQueryParam} from "../../utils/history.js";
import {AccountStore, updateConsents, updateUser} from "../../stores/AccountStore.js";
import styles from "./Account.module.css.proxy.js";
const Account = ({panelClassName, panelHeaderClassName}) => {
  const {t} = useTranslation("user");
  const history = useHistory();
  const [editing, setEditing] = useState("none");
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [viewPassword, toggleViewPassword] = useToggle();
  const {user: customer, customerConsents, publisherConsents} = AccountStore.useState((state) => state);
  const consentValues = useMemo(() => formatConsentValues(publisherConsents, customerConsents), [publisherConsents, customerConsents]);
  const initialValues = useMemo(() => ({...customer, consents: consentValues}), [customer, consentValues]);
  const formatConsentLabel = (label) => {
    const hasHrefOpenTag = /<a(.|\n)*?>/.test(label);
    const hasHrefCloseTag = /<\/a(.|\n)*?>/.test(label);
    if (hasHrefOpenTag && hasHrefCloseTag) {
      return /* @__PURE__ */ React.createElement("span", {
        dangerouslySetInnerHTML: {__html: label}
      });
    }
    return label;
  };
  const translateErrors = (errors2) => {
    const formErrors = {};
    errors2?.flatMap((e) => e.split(",")).map((error) => {
      switch (error.trim()) {
        case "Invalid param email":
          formErrors.email = t("account.errors.invalid_param_email");
          break;
        case "Customer email already exists":
          formErrors.email = t("account.errors.email_exists");
          break;
        case "Please enter a valid e-mail address.":
          formErrors.email = t("account.errors.please_enter_valid_email");
          break;
        case "Invalid confirmationPassword": {
          formErrors.confirmationPassword = t("account.errors.invalid_password");
          break;
        }
        case "firstName can have max 50 characters.": {
          formErrors.firstName = t("account.errors.first_name_too_long");
          break;
        }
        case "lastName can have max 50 characters.": {
          formErrors.lastName = t("account.errors.last_name_too_long");
          break;
        }
        default:
          console.info("Unknown error", error);
          return;
      }
    });
    return formErrors;
  };
  async function handleSubmit(values) {
    let response = void 0;
    setIsLoading(true);
    switch (editing) {
      case "account":
        response = await updateUser({email: values.email, confirmationPassword: values.confirmationPassword});
        break;
      case "info":
        response = await updateUser({firstName: values.firstName, lastName: values.lastName});
        break;
      case "consents":
        response = await updateConsents(formatConsentsFromValues(publisherConsents, values));
        break;
      default:
        return;
    }
    setErrors(translateErrors(response?.errors));
    if (response && !response?.errors?.length) {
      setEditing("none");
    }
    setIsLoading(false);
  }
  const onCancelClick = (formResetHandler) => {
    formResetHandler && formResetHandler();
    setErrors(void 0);
    setEditing("none");
  };
  const editPasswordClickHandler = () => {
    history.push(addQueryParam(history, "u", "reset-password"));
  };
  return /* @__PURE__ */ React.createElement(Form, {
    initialValues,
    onSubmit: handleSubmit
  }, ({values, handleChange, handleReset, handleSubmit: handleSubmit2, hasChanged}) => /* @__PURE__ */ React.createElement(React.Fragment, null, isLoading && /* @__PURE__ */ React.createElement(LoadingOverlay, {
    transparentBackground: true
  }), /* @__PURE__ */ React.createElement("div", {
    className: panelClassName
  }, /* @__PURE__ */ React.createElement("div", {
    className: panelHeaderClassName
  }, /* @__PURE__ */ React.createElement("h3", null, t("account.email"))), /* @__PURE__ */ React.createElement("div", {
    className: styles.flexBox
  }, /* @__PURE__ */ React.createElement(TextField, {
    name: "email",
    label: t("account.email"),
    value: values.email,
    onChange: handleChange,
    error: !!errors?.email,
    helperText: errors?.email,
    disabled: isLoading,
    editing: editing === "account",
    required: true
  }), editing === "account" && /* @__PURE__ */ React.createElement(TextField, {
    name: "confirmationPassword",
    label: t("account.confirm_password"),
    value: values.confirmationPassword,
    onChange: handleChange,
    error: !!errors?.confirmationPassword,
    helperText: errors?.confirmationPassword,
    type: viewPassword ? "text" : "password",
    disabled: isLoading,
    rightControl: /* @__PURE__ */ React.createElement(IconButton, {
      "aria-label": viewPassword ? t("account.hide_password") : t("account.view_password"),
      onClick: () => toggleViewPassword()
    }, viewPassword ? /* @__PURE__ */ React.createElement(Visibility, null) : /* @__PURE__ */ React.createElement(VisibilityOff, null)),
    required: true
  }), /* @__PURE__ */ React.createElement("div", {
    className: styles.controls
  }, editing === "account" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
    label: t("account.save"),
    type: "submit",
    onClick: handleSubmit2,
    disabled: isLoading || !values.email || !values.confirmationPassword
  }), /* @__PURE__ */ React.createElement(Button, {
    label: t("account.cancel"),
    type: "reset",
    variant: "text",
    onClick: () => onCancelClick(handleReset)
  })) : /* @__PURE__ */ React.createElement(Button, {
    label: t("account.edit_account"),
    type: "button",
    onClick: () => setEditing("account")
  })))), /* @__PURE__ */ React.createElement("div", {
    className: panelClassName
  }, /* @__PURE__ */ React.createElement("div", {
    className: panelHeaderClassName
  }, /* @__PURE__ */ React.createElement("h3", null, t("account.security"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, t("account.password")), /* @__PURE__ */ React.createElement("p", null, "****************"), /* @__PURE__ */ React.createElement(Button, {
    label: t("account.edit_password"),
    type: "button",
    onClick: () => customer ? editPasswordClickHandler() : null
  }))), /* @__PURE__ */ React.createElement("div", {
    className: panelClassName
  }, /* @__PURE__ */ React.createElement("div", {
    className: panelHeaderClassName
  }, /* @__PURE__ */ React.createElement("h3", null, t("account.about_you"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: styles.flexBox
  }, /* @__PURE__ */ React.createElement(TextField, {
    name: "firstName",
    label: t("account.firstname"),
    value: values.firstName,
    onChange: handleChange,
    error: !!errors?.firstName,
    helperText: errors?.firstName,
    disabled: isLoading,
    editing: editing === "info"
  }), /* @__PURE__ */ React.createElement(TextField, {
    name: "lastName",
    label: t("account.lastname"),
    value: values.lastName,
    onChange: handleChange,
    error: !!errors?.lastName,
    helperText: errors?.lastName,
    disabled: isLoading,
    editing: editing === "info"
  }), /* @__PURE__ */ React.createElement("div", {
    className: styles.controls
  }, editing === "info" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
    label: t("account.save"),
    type: "submit",
    disabled: !hasChanged,
    onClick: handleSubmit2
  }), /* @__PURE__ */ React.createElement(Button, {
    type: "reset",
    variant: "text",
    label: t("account.cancel"),
    onClick: () => setEditing("none")
  })) : /* @__PURE__ */ React.createElement(Button, {
    type: "button",
    label: t("account.edit_information"),
    onClick: () => setEditing("info")
  }))))), publisherConsents && /* @__PURE__ */ React.createElement("div", {
    className: panelClassName
  }, /* @__PURE__ */ React.createElement("div", {
    className: panelHeaderClassName
  }, /* @__PURE__ */ React.createElement("h3", null, t("account.terms_and_tracking"))), /* @__PURE__ */ React.createElement("div", {
    className: styles.flexBox,
    onClick: () => setEditing("consents")
  }, publisherConsents.map((consent, index) => /* @__PURE__ */ React.createElement(Checkbox, {
    key: index,
    name: consent.name,
    value: consent.value || "",
    checked: values.consents?.[consent.name] || false,
    onChange: (event) => handleChange ? handleChange(event, {nestInto: "consents"}) : null,
    label: formatConsentLabel(consent.label),
    disabled: consent.required
  })), /* @__PURE__ */ React.createElement("div", {
    className: styles.controls
  }, /* @__PURE__ */ React.createElement(Button, {
    id: "submit_consents",
    className: styles.submitConsents,
    type: "button",
    label: t("account.update_consents"),
    disabled: !hasChanged,
    onClick: handleSubmit2
  }))))));
};
export default Account;
