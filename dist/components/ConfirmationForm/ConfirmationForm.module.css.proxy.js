
export let code = "._title_bmbtt_1 {\n  margin: 24px 0;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 26px;\n}\n\n._text_bmbtt_7 {\n  margin-bottom: 24px;\n  font-size: 16px;\n}\n\n._button_bmbtt_12 {\n  margin: 16px 0;\n}\n\n._notSure_bmbtt_16 {\n  font-size: 16px;\n}\n\n._link_bmbtt_20 {\n  margin-bottom: 24px;\n  margin-left: 6px;\n  color: var(--primary-color);\n  font-weight: var(--body-font-weight-bold);\n  cursor: pointer;\n}\n\n._link_bmbtt_20:hover {\n  text-decoration: underline;\n}";
let json = {"title":"_title_bmbtt_1","text":"_text_bmbtt_7","button":"_button_bmbtt_12","notSure":"_notSure_bmbtt_16","link":"_link_bmbtt_20"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}