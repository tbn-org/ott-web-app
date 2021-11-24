import {useEffect, useRef, useState} from "../../_snowpack/pkg/react.js";
const useCountdown = (durationSeconds, intervalSeconds = 1, completeHandler) => {
  const timerRef = useRef();
  const [countdown, setCountdown] = useState(durationSeconds);
  useEffect(() => {
    window.clearTimeout(timerRef.current);
    if (countdown === 0) {
      if (completeHandler)
        completeHandler();
      return;
    }
    timerRef.current = window.setTimeout(() => {
      setCountdown((count) => count - intervalSeconds);
    }, intervalSeconds * 1e3);
  }, [countdown]);
  return countdown;
};
export default useCountdown;
