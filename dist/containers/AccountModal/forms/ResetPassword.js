import React, {useState} from "../../../../_snowpack/pkg/react.js";
import {useHistory} from "../../../../_snowpack/pkg/react-router-dom.js";
import {object, string} from "../../../../_snowpack/pkg/yup.js";
import {useTranslation} from "../../../../_snowpack/pkg/react-i18next.js";
import {resetPassword, AccountStore, logout} from "../../../stores/AccountStore.js";
import {removeQueryParam, addQueryParam} from "../../../utils/history.js";
import ResetPasswordForm from "../../../components/ResetPasswordForm/ResetPasswordForm.js";
import useForm from "../../../hooks/useForm.js";
import ForgotPasswordForm from "../../../components/ForgotPasswordForm/ForgotPasswordForm.js";
import ConfirmationForm from "../../../components/ConfirmationForm/ConfirmationForm.js";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay.js";
import {addQueryParams} from "../../../utils/formatting.js";
const ResetPassword = ({type}) => {
  const {t} = useTranslation("account");
  const history = useHistory();
  const user = AccountStore.useState((state) => state.user);
  const [resetPasswordSubmitting, setResetPasswordSubmitting] = useState(false);
  const cancelClickHandler = () => {
    history.push(removeQueryParam(history, "u"));
  };
  const backToLoginClickHandler = () => {
    if (user) {
      logout();
    }
    history.push(addQueryParams("/", {u: "login"}));
  };
  const resetPasswordClickHandler = async () => {
    const resetUrl = `${window.location.origin}/?u=edit-password`;
    try {
      if (!user?.email)
        throw new Error("invalid param email");
      setResetPasswordSubmitting(true);
      await resetPassword(user.email, resetUrl);
      setResetPasswordSubmitting(false);
      history.push(addQueryParam(history, "u", "send-confirmation"));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.toLowerCase().includes("invalid param email")) {
          console.info(error.message);
        }
      }
    }
  };
  const emailSubmitHandler = async (formData, {setErrors, setSubmitting}) => {
    const resetUrl = `${window.location.origin}/?u=edit-password`;
    try {
      await resetPassword(formData.email, resetUrl);
      history.push(addQueryParam(history, "u", "send-confirmation"));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.toLowerCase().includes("invalid param email")) {
          setErrors({email: t("reset.wrong_email")});
        }
      }
    }
    setSubmitting(false);
  };
  const emailForm = useForm({email: ""}, emailSubmitHandler, object().shape({
    email: string().email(t("login.field_is_not_valid_email")).required(t("login.field_required"))
  }), true);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, type === "reset" && /* @__PURE__ */ React.createElement(ResetPasswordForm, {
    submitting: resetPasswordSubmitting,
    onCancel: cancelClickHandler,
    onReset: resetPasswordClickHandler
  }), type === "forgot" && /* @__PURE__ */ React.createElement(ForgotPasswordForm, {
    value: emailForm.values,
    submitting: emailForm.submitting,
    onChange: emailForm.handleChange,
    errors: emailForm.errors,
    onSubmit: emailForm.handleSubmit,
    onBlur: emailForm.handleBlur
  }), type === "confirmation" && /* @__PURE__ */ React.createElement(ConfirmationForm, {
    loggedIn: !!user,
    email: user?.email || emailForm.values.email,
    onBackToLogin: backToLoginClickHandler
  }), (emailForm.submitting || resetPasswordSubmitting) && /* @__PURE__ */ React.createElement(LoadingOverlay, {
    transparentBackground: true,
    inline: true
  }));
};
export default ResetPassword;
