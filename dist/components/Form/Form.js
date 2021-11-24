import React, {useState, useEffect} from "../../../_snowpack/pkg/react.js";
const Form = ({initialValues, editing = true, children, onSubmit}) => {
  const [values, setValues] = useState(initialValues);
  const [hasChanged, setHasChanged] = useState(false);
  const handleChange = (event, options) => {
    if (!event.currentTarget)
      return;
    const name = event.currentTarget.name;
    const value = event.currentTarget.type === "checkbox" ? event.currentTarget.checked : event.currentTarget.value;
    setHasChanged(true);
    if (options?.nestInto) {
      const oldSubValues = values[options.nestInto];
      const subValues = {...oldSubValues, [name]: value};
      return setValues({...values, [options.nestInto]: subValues});
    }
    setValues({...values, [name]: value});
  };
  const handleSubmit = (event) => {
    event && event.preventDefault();
    onSubmit && onSubmit(values);
    setHasChanged(false);
  };
  const handleReset = () => {
    setValues(initialValues);
    setHasChanged(false);
  };
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);
  if (!editing) {
    return children({values});
  }
  return /* @__PURE__ */ React.createElement("form", {
    noValidate: true,
    onSubmit: (event) => event.preventDefault()
  }, children({values, handleChange, handleSubmit, handleReset, hasChanged}));
};
export default Form;
