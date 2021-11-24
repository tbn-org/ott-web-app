import {useState, useEffect} from "../../_snowpack/pkg/react.js";
import {addMediaQueryListChangeListener, removeMediaQueryListChangeListener} from "../utils/matchMedia.js";
const XS_MATCH_MEDIA = matchMedia("screen and (max-width: 479px)");
const SM_MATCH_MEDIA = matchMedia("screen and (min-width: 480px) and (max-width: 767px)");
const MD_MATCH_MEDIA = matchMedia("screen and (min-width: 768px) and (max-width: 1023px)");
const LG_MATCH_MEDIA = matchMedia("screen and (min-width: 1024px) and (max-width: 1199px)");
export var Breakpoint;
(function(Breakpoint2) {
  Breakpoint2[Breakpoint2["xs"] = 0] = "xs";
  Breakpoint2[Breakpoint2["sm"] = 1] = "sm";
  Breakpoint2[Breakpoint2["md"] = 2] = "md";
  Breakpoint2[Breakpoint2["lg"] = 3] = "lg";
  Breakpoint2[Breakpoint2["xl"] = 4] = "xl";
})(Breakpoint || (Breakpoint = {}));
const getScreenSize = () => {
  if (XS_MATCH_MEDIA.matches)
    return 0;
  if (SM_MATCH_MEDIA.matches)
    return 1;
  if (MD_MATCH_MEDIA.matches)
    return 2;
  if (LG_MATCH_MEDIA.matches)
    return 3;
  else
    return 4;
};
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(() => getScreenSize());
  useEffect(() => {
    const changeEventHandler = () => setBreakpoint(getScreenSize());
    addMediaQueryListChangeListener(XS_MATCH_MEDIA, changeEventHandler);
    addMediaQueryListChangeListener(SM_MATCH_MEDIA, changeEventHandler);
    addMediaQueryListChangeListener(MD_MATCH_MEDIA, changeEventHandler);
    addMediaQueryListChangeListener(LG_MATCH_MEDIA, changeEventHandler);
    return () => {
      removeMediaQueryListChangeListener(XS_MATCH_MEDIA, changeEventHandler);
      removeMediaQueryListChangeListener(SM_MATCH_MEDIA, changeEventHandler);
      removeMediaQueryListChangeListener(MD_MATCH_MEDIA, changeEventHandler);
      removeMediaQueryListChangeListener(LG_MATCH_MEDIA, changeEventHandler);
    };
  }, []);
  return breakpoint;
};
export default useBreakpoint;
