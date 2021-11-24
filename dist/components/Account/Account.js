import React, {useState, useEffect, useMemo} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../../../_snowpack/pkg/react-router-dom.js";
import {formatConsentsFromValues, formatConsentValues} from "../../utils/collection.js";
import Visibility from "../../icons/Visibility.js";
import VisibilityOff from "../../icons/VisibilityOff.js";
import useToggle from "../../hooks/useToggle.js";
import Button from "../Button/Button.js";
import Spinner from "../Spinner/Spinner.js";
import Form from "../Form/Form.js";
import IconButton from "../IconButton/IconButton.js";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay.js";
import TextField from "../TextField/TextField.js";
import Checkbox from "../Checkbox/Checkbox.js";
import {addQueryParam} from "../../utils/history.js";
import styles from "./Account.module.css.proxy.js";
const Account = ({
  customer,
  errors,
  isLoading,
  consentsLoading,
  publisherConsents,
  customerConsents,
  panelClassName,
  panelHeaderClassName,
  onUpdateEmailSubmit,
  onUpdateInfoSubmit,
  onUpdateConsentsSubmit,
  onReset
}) => {
  const {t} = useTranslation("user");
  const history = useHistory();
  const [editing, setEditing] = useState("none");
  const [viewPassword, toggleViewPassword] = useToggle();
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
  const handleSubmit = (values) => {
    switch (editing) {
      case "account":
        return onUpdateEmailSubmit(values);
      case "info":
        return onUpdateInfoSubmit(values);
      case "consents":
        return onUpdateConsentsSubmit(formatConsentsFromValues(publisherConsents, values));
      default:
        return;
    }
  };
  const onCancelClick = (formResetHandler) => {
    formResetHandler && formResetHandler();
    setEditing("none");
    onReset && onReset();
  };
  const editPasswordClickHandler = () => {
    history.push(addQueryParam(history, "u", "reset-password"));
  };
  useEffect(() => {
    !isLoading && setEditing("none");
  }, [isLoading]);
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
  }))))), /* @__PURE__ */ React.createElement("div", {
    className: panelClassName
  }, /* @__PURE__ */ React.createElement("div", {
    className: panelHeaderClassName
  }, /* @__PURE__ */ React.createElement("h3", null, t("account.terms_and_tracking"))), consentsLoading ? /* @__PURE__ */ React.createElement(Spinner, {
    size: "small"
  }) : publisherConsents ? /* @__PURE__ */ React.createElement("div", {
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
  }))) : null)));
};
export default Account;
