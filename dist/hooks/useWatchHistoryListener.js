import {useEffect} from "../../_snowpack/pkg/react.js";
export const useWatchHistoryListener = (saveItem) => {
  useEffect(() => {
    const visibilityListener = () => document.visibilityState === "hidden" && saveItem();
    window.addEventListener("beforeunload", saveItem);
    window.addEventListener("visibilitychange", visibilityListener);
    return () => {
      saveItem();
      window.removeEventListener("beforeunload", saveItem);
      window.removeEventListener("visibilitychange", visibilityListener);
    };
  }, []);
};
