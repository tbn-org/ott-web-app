
export let code = "._title_feuiy_1 {\n  margin-bottom: 8px;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n}\n\n._confirmButton_feuiy_7 {\n  margin-bottom: 8px;\n}";
let json = {"title":"_title_feuiy_1","confirmButton":"_confirmButton_feuiy_7"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}