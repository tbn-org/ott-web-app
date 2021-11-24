
export let code = "._logo_ci3i9_1 {\n  max-width: 100%;\n  max-height: 46px;\n  vertical-align: middle;\n  cursor: pointer;\n}\n\n@media screen and (max-width: 1023px) {\n  ._logo_ci3i9_1 {\n    max-height: 36px;\n  }\n}";
let json = {"logo":"_logo_ci3i9_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}