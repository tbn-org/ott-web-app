
export let code = "._backdrop_etahg_1 {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 19;\n  display: none;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.4);\n  transition: all 0.3s ease;\n}\n\n._sidebar_etahg_13 {\n  position: fixed;\n  top: 0;\n  z-index: 20;\n  display: none;\n  width: 270px;\n  max-width: 90vw;\n  height: 100vh;\n  background-color: var(--body-background-color);\n  transform: translateX(-100%);\n  transition: transform 0.3s cubic-bezier(0.52, 0.51, 0.2, 1);\n}\n\n._heading_etahg_26 {\n  display: flex;\n  padding: 16px 0 0;\n}\n\n._group_etahg_31 {\n  display: flex;\n  flex-direction: column;\n  padding: 16px 0;\n}\n\n@media screen and (max-width: 1023px) {\n  ._sidebar_etahg_13 {\n    display: inline-block;\n  }\n  ._sidebar_etahg_13._open_etahg_41 {\n    transform: translateX(0);\n  }\n\n  ._backdrop_etahg_1 {\n    display: inline-block;\n    visibility: hidden;\n  }\n  ._backdrop_etahg_1._visible_etahg_49 {\n    visibility: visible;\n  }\n}";
let json = {"backdrop":"_backdrop_etahg_1","sidebar":"_sidebar_etahg_13","heading":"_heading_etahg_26","group":"_group_etahg_31","open":"_open_etahg_41","visible":"_visible_etahg_49"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}