
export let code = "._passwordStrength_1od1i_1 {\n  position: relative;\n  display: flex;\n  align-items: center;\n  height: 16px;\n  margin: 8px 0;\n  font-size: 14px;\n}\n._passwordStrength_1od1i_1[data-strength=\"1\"] ._passwordStrengthFill_1od1i_9 {\n  width: 25%;\n  background: orangered;\n}\n._passwordStrength_1od1i_1[data-strength=\"1\"] ._label_1od1i_13 {\n  color: orangered;\n}\n._passwordStrength_1od1i_1[data-strength=\"2\"] ._passwordStrengthFill_1od1i_9 {\n  width: 50%;\n  background: orange;\n}\n._passwordStrength_1od1i_1[data-strength=\"2\"] ._label_1od1i_13 {\n  color: orange;\n}\n._passwordStrength_1od1i_1[data-strength=\"3\"] ._passwordStrengthFill_1od1i_9 {\n  width: 75%;\n  background: yellowgreen;\n}\n._passwordStrength_1od1i_1[data-strength=\"3\"] ._label_1od1i_13 {\n  color: yellowgreen;\n}\n._passwordStrength_1od1i_1[data-strength=\"4\"] ._passwordStrengthFill_1od1i_9 {\n  width: 100%;\n  background: green;\n}\n._passwordStrength_1od1i_1[data-strength=\"4\"] ._label_1od1i_13 {\n  color: green;\n}\n._passwordStrengthBar_1od1i_38 {\n  position: relative;\n  width: 170px;\n  height: 6px;\n  margin-right: 8px;\n  background: #ddd;\n  border-radius: 5px;\n}\n._passwordStrengthFill_1od1i_9 {\n  position: absolute;\n  width: 0;\n  height: 100%;\n  background: transparent;\n  border-radius: inherit;\n  transition: width 0.5s ease-in-out, background 0.25s;\n}\n._label_1od1i_13 {\n  font-weight: 700;\n  font-size: 14px;\n}";
let json = {"passwordStrength":"_passwordStrength_1od1i_1","passwordStrengthFill":"_passwordStrengthFill_1od1i_9","label":"_label_1od1i_13","passwordStrengthBar":"_passwordStrengthBar_1od1i_38"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}