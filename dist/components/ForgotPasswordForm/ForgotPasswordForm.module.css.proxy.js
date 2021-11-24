
export let code = "._title_17xro_1 {\n  margin: 24px 0;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 26px;\n}\n\n._text_17xro_7 {\n  margin-bottom: 24px;\n  font-size: 16px;\n}\n\n._button_17xro_12 {\n  margin: 16px 0;\n}";
let json = {"title":"_title_17xro_1","text":"_text_17xro_7","button":"_button_17xro_12"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}