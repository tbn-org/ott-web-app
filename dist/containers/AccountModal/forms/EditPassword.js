import React from "../../../../_snowpack/pkg/react.js";
import {useHistory} from "../../../../_snowpack/pkg/react-router-dom.js";
import {object, string} from "../../../../_snowpack/pkg/yup.js";
import {useTranslation} from "../../../../_snowpack/pkg/react-i18next.js";
import {changePassword} from "../../../stores/AccountStore.js";
import useForm from "../../../hooks/useForm.js";
import EditPasswordForm from "../../../components/EditPasswordForm/EditPasswordForm.js";
import useQueryParam from "../../../hooks/useQueryParam.js";
import {addQueryParams} from "../../../utils/formatting.js";
const ResetPassword = () => {
  const {t} = useTranslation("account");
  const history = useHistory();
  const resetPasswordTokenParam = useQueryParam("resetPasswordToken");
  const emailParam = useQueryParam("email");
  const passwordSubmitHandler = async (formData, {setErrors, setSubmitting, setValue}) => {
    if (!emailParam || !resetPasswordTokenParam) {
      setErrors({form: t("reset.invalid_link")});
      return setSubmitting(false);
    }
    try {
      await changePassword(emailParam, formData.password, resetPasswordTokenParam);
      history.push(addQueryParams(window.location.origin, {u: "login"}));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("invalid param password")) {
          setErrors({password: t("reset.invalid_password")});
        } else if (error.message.includes("resetPasswordToken is not valid")) {
          setErrors({form: t("reset.invalid_token")});
        }
        setValue("password", "");
      }
    }
    setSubmitting(false);
  };
  const passwordForm = useForm({password: ""}, passwordSubmitHandler, object().shape({
    password: string().matches(/^(?=.*[a-z])(?=.*[0-9]).{8,}$/, t("registration.invalid_password")).required(t("login.field_required"))
  }), true);
  return /* @__PURE__ */ React.createElement(EditPasswordForm, {
    value: passwordForm.values,
    submitting: passwordForm.submitting,
    onChange: passwordForm.handleChange,
    onBlur: passwordForm.handleBlur,
    errors: passwordForm.errors,
    onSubmit: passwordForm.handleSubmit
  });
};
export default ResetPassword;
