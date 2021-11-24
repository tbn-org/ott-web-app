
export let code = "._welcome_v7d1f_1 h2 {\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n}";
let json = {"welcome":"_welcome_v7d1f_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}