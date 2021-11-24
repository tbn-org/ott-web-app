import {useLocation} from "../../_snowpack/pkg/react-router.js";
import {useEffect, useState} from "../../_snowpack/pkg/react.js";
function useQueryParam(key) {
  const [param, setParam] = useState(void 0);
  const location = useLocation();
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    setParam(urlSearchParams.get(key) || void 0);
  }, [location]);
  return param;
}
export default useQueryParam;
