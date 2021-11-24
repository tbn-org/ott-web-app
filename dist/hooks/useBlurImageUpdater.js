import {useCallback, useEffect} from "../../_snowpack/pkg/react.js";
import {UIStore} from "../stores/UIStore.js";
const useBlurImageUpdater = (data) => {
  useEffect(() => {
    const targetItem = Array.isArray(data) ? data?.[0] : data;
    if (!targetItem?.image)
      return;
    UIStore.update((state) => {
      state.blurImage = targetItem.image;
    });
  }, [data]);
  return useCallback((image) => {
    UIStore.update((state) => {
      state.blurImage = image;
    });
  }, []);
};
export default useBlurImageUpdater;
