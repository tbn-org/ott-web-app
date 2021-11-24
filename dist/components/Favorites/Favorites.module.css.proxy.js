
export let code = "._header_17fi9_1 {\n  display: flex;\n  margin-bottom: 24px;\n}\n._header_17fi9_1 > h3 {\n  margin-right: 24px;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 34px;\n  font-style: normal;\n  line-height: 36px;\n  letter-spacing: 0.25px;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.14), 0 3px 4px rgba(0, 0, 0, 0.12), 0 1px 5px rgba(0, 0, 0, 0.2);\n}";
let json = {"header":"_header_17fi9_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}