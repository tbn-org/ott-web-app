
export let code = "button {\n  margin-right: 16px;\n}\n\n._flexBox_r869h_5 {\n  display: flex;\n  flex-direction: column;\n}\n\n._flexBox_r869h_5 > * {\n  margin-bottom: 8px;\n}\n\n._controls_r869h_13 {\n  margin-top: 16px;\n}\n\n._controls_r869h_13 > button {\n  margin-right: 8px;\n}\n\n._submitConsents_r869h_20 {\n  margin-top: 16px;\n}";
let json = {"flexBox":"_flexBox_r869h_5","controls":"_controls_r869h_13","submitConsents":"_submitConsents_r869h_20"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}