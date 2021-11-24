import {useEffect, useState} from "../../_snowpack/pkg/react.js";
const generateId = (prefix, suffix) => {
  return [prefix, Math.round(Math.random() * 1e4), suffix].filter(Boolean).join("_");
};
const useOpaqueId = (prefix, suffix, override) => {
  const [id, setId] = useState(override || generateId(prefix, suffix));
  useEffect(() => {
    setId(override || generateId(prefix, suffix));
  }, [override, prefix, suffix]);
  return id;
};
export default useOpaqueId;
