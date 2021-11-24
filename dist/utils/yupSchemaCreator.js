import * as yupRaw from "../../_snowpack/pkg/yup.js";
const yup = yupRaw;
export function createYupSchema(schema, config) {
  const {name, validationType, validations = []} = config;
  if (!yup[validationType] || !validations) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach((validation) => {
    const {params, type} = validation;
    if (!validator[type]) {
      return;
    }
    validator = validator[type](...params);
  });
  schema[name] = validator;
  return schema;
}
