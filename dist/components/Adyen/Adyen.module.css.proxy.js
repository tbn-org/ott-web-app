
export let code = "._adyen_1wab6_1 {\n  margin-bottom: 24px;\n}\n\n._container_1wab6_5 {\n  margin-bottom: 24px;\n}";
let json = {"adyen":"_adyen_1wab6_1","container":"_container_1wab6_5"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}