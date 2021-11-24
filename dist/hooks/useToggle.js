import {useState} from "../../_snowpack/pkg/react.js";
const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = (forceValue) => setState((current) => typeof forceValue !== "undefined" ? forceValue : !current);
  return [state, toggle];
};
export default useToggle;
