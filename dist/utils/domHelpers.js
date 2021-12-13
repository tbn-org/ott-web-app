import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

export const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
let size;
export function getPublicUrl(url) {
  if (url.startsWith("http")) {
    return url;
  }
  const baseUrl = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_BASE_URL || "";
  const trimSlashes = (s) => s.replace(/^\/+|\/+$/g, "");
  return [baseUrl, url].map(trimSlashes).join("/");
}
export default function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (canUseDOM) {
      const scrollDiv = document.createElement("div");
      scrollDiv.style.position = "absolute";
      scrollDiv.style.top = "-9999px";
      scrollDiv.style.width = "50px";
      scrollDiv.style.height = "50px";
      scrollDiv.style.overflow = "scroll";
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }
  return size;
}
