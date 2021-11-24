
export let code = "._container_1onmd_1._error_1onmd_1 ._helperText_1onmd_1 {\n  color: #ff0c3e;\n}\n\n._header_1onmd_5 {\n  margin-bottom: 8px;\n  font-weight: var(--body-font-weight-bold);\n  text-align: left;\n}\n\n._header_1onmd_5 > span {\n  float: right;\n  color: rgba(255, 255, 255, 0.7);\n  font-weight: normal;\n}\n\n._radio_1onmd_16 {\n  display: flex;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n._radio_1onmd_16 > label {\n  margin-left: 8px;\n  font-size: 14px;\n  cursor: pointer;\n}\n\n._radio_1onmd_16 > input {\n  position: relative;\n  width: 20px;\n  height: 20px;\n  margin: 0;\n  border-radius: 15px;\n  transition: all 0.1s;\n  appearance: none;\n}\n\n._radio_1onmd_16 > input:not(:checked) {\n  border: 2px solid rgba(255, 255, 255, 0.34);\n}\n\n._radio_1onmd_16 > input:not(:checked):hover {\n  border-color: rgba(255, 255, 255, 0.7);\n}\n\n._radio_1onmd_16 > input:checked {\n  width: 20px;\n  height: 20px;\n  border: 2px solid var(--primary-color);\n}\n\n._radio_1onmd_16 > input:checked::after {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 10px;\n  height: 10px;\n  background-color: var(--primary-color);\n  border: 2px solid transparent;\n  border-radius: 15px;\n  transform: translateX(-50%) translateY(-50%);\n  content: \"\";\n}\n\n._helperText_1onmd_1 {\n  margin-top: 4px;\n  font-size: 12px;\n  text-align: left;\n}";
let json = {"container":"_container_1onmd_1","error":"_error_1onmd_1","helperText":"_helperText_1onmd_1","header":"_header_1onmd_5","radio":"_radio_1onmd_16"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}