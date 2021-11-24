import React from "../../../../_snowpack/pkg/react.js";
import {object, string} from "../../../../_snowpack/pkg/yup.js";
import {useTranslation} from "../../../../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../../../../_snowpack/pkg/react-router.js";
import LoginForm from "../../../components/LoginForm/LoginForm.js";
import {login} from "../../../stores/AccountStore.js";
import useForm from "../../../hooks/useForm.js";
import {removeQueryParam} from "../../../utils/history.js";
import {ConfigStore} from "../../../stores/ConfigStore.js";
const Login = () => {
  const {siteName} = ConfigStore.useState((s) => s.config);
  const history = useHistory();
  const {t} = useTranslation("account");
  const loginSubmitHandler = async (formData, {setErrors, setSubmitting, setValue}) => {
    try {
      await login(formData.email, formData.password);
      history.push(removeQueryParam(history, "u"));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.toLowerCase().includes("invalid param email")) {
          setErrors({email: t("login.wrong_email")});
        } else {
          setErrors({form: t("login.wrong_combination")});
        }
        setValue("password", "");
      }
    }
    setSubmitting(false);
  };
  const validationSchema = object().shape({
    email: string().email(t("login.field_is_not_valid_email")).required(t("login.field_required")),
    password: string().required(t("login.field_required"))
  });
  const initialValues = {email: "", password: ""};
  const {handleSubmit, handleChange, values, errors, submitting} = useForm(initialValues, loginSubmitHandler, validationSchema);
  return /* @__PURE__ */ React.createElement(LoginForm, {
    onSubmit: handleSubmit,
    onChange: handleChange,
    values,
    errors,
    submitting,
    siteName
  });
};
export default Login;
