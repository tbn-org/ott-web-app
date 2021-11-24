
export let code = "._cinema_1w0uk_1._fill_1w0uk_1 {\n  display: flex;\n  width: 100%;\n  height: 100%;\n}";
let json = {"cinema":"_cinema_1w0uk_1","fill":"_fill_1w0uk_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}