
export let code = "._title_1o843_1 {\n  margin-bottom: 16px;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n}";
let json = {"title":"_title_1o843_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}