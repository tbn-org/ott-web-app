import {useEffect, useRef} from "../../_snowpack/pkg/react.js";
const useFirstRender = () => {
  const firstRenderRef = useRef(true);
  useEffect(() => {
    firstRenderRef.current = false;
  }, []);
  return firstRenderRef.current;
};
export default useFirstRender;
