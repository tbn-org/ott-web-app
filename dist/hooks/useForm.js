import {useState} from "../../_snowpack/pkg/react.js";
import {ValidationError} from "../../_snowpack/pkg/yup.js";
export default function useForm(initialValues, onSubmit, validationSchema, validateOnBlur = false) {
  const [touched, setTouched] = useState(Object.fromEntries(Object.keys(initialValues).map((key) => [key, false])));
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const validateField = (name, formValues) => {
    if (!validationSchema)
      return;
    try {
      validationSchema.validateSyncAt(name, formValues);
      setErrors((errors2) => ({...errors2, [name]: null}));
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorMessage = error.errors[0];
        setErrors((errors2) => ({...errors2, [name]: errorMessage}));
      }
    }
  };
  const setValue = (name, value) => {
    setValues((current) => ({...current, [name]: value}));
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target instanceof HTMLInputElement && event.target.type === "checkbox" ? event.target.checked : event.target.value;
    const newValues = {...values, [name]: value};
    setValues(newValues);
    setTouched((current) => ({...current, [name]: value}));
    if (errors[name]) {
      validateField(name, newValues);
    }
  };
  const handleBlur = (event) => {
    if (!validateOnBlur || !touched[event.target.name])
      return;
    validateField(event.target.name, values);
  };
  const validate = (validationSchema2) => {
    try {
      validationSchema2.validateSync(values, {abortEarly: false});
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors = {};
        for (let index = 0; index < error.inner.length; index++) {
          const path = error.inner[index].path;
          const message = error.inner[index].errors[0];
          if (path && message && !newErrors[path]) {
            newErrors[path] = message;
          }
        }
        setErrors(newErrors);
      }
    }
    return false;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!onSubmit || submitting)
      return;
    setErrors({});
    if (validationSchema && !validate(validationSchema)) {
      return;
    }
    setSubmitting(true);
    onSubmit(values, {setValue, setErrors, setSubmitting, validate});
  };
  return {values, errors, handleChange, handleBlur, handleSubmit, submitting, setValue, setErrors, setSubmitting};
}
