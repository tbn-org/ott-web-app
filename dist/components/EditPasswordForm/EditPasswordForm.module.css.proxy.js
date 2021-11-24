
export let code = "._title_1t04b_1 {\n  margin: 24px 0;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 26px;\n}\n\n._text_1t04b_7 {\n  margin-bottom: 24px;\n  font-size: 16px;\n}\n\n._button_1t04b_12 {\n  margin-bottom: 8px;\n}\n\n._link_1t04b_16,\n._textField_1t04b_17 {\n  margin-bottom: 24px;\n}";
let json = {"title":"_title_1t04b_1","text":"_text_1t04b_7","button":"_button_1t04b_12","link":"_link_1t04b_16","textField":"_textField_1t04b_17"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}