
export let code = "._loadingOverlay_wjbso_1 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n._fixed_wjbso_7 {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 10;\n  width: 100vw;\n  height: calc(100vh - calc(100vh - 100%));\n  background-color: var(--body-background-color);\n}\n\n._transparent_wjbso_17 {\n  opacity: 0.5;\n}\n\n._inline_wjbso_21 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n}";
let json = {"loadingOverlay":"_loadingOverlay_wjbso_1","fixed":"_fixed_wjbso_7","transparent":"_transparent_wjbso_17","inline":"_inline_wjbso_21"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}