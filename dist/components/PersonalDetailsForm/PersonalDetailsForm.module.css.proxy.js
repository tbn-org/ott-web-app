
export let code = "._title_a6ei2_1 {\n  margin-bottom: 24px;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n}\n\n._continue_a6ei2_7 {\n  margin: 16px 0;\n}";
let json = {"title":"_title_a6ei2_1","continue":"_continue_a6ei2_7"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}