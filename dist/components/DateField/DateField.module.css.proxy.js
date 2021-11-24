
export let code = "._dateField_1ckiv_1 {\n  width: 100%;\n  margin-bottom: 8px;\n}\n._dateField_1ckiv_1._error_1ckiv_5 ._helperText_1ckiv_5 {\n  color: #ff0c3e;\n}\n._dateField_1ckiv_1._error_1ckiv_5 ._container_1ckiv_8 {\n  border-color: #ff0c3e;\n}\n._dateField_1ckiv_1._disabled_1ckiv_11 ._container_1ckiv_8 {\n  opacity: 0.7;\n}\n._dateField_1ckiv_1:hover:not(._disabled_1ckiv_11) ._container_1ckiv_8 {\n  background-color: rgba(255, 255, 255, 0.08);\n  border-color: rgba(255, 255, 255, 0.7);\n}\n._label_1ckiv_19 {\n  display: block;\n  margin-bottom: 4px;\n  font-weight: var(--body-font-weight-bold);\n  text-align: left;\n}\n._label_1ckiv_19 > span {\n  float: right;\n  color: rgba(255, 255, 255, 0.7);\n  font-weight: normal;\n}\n._control_1ckiv_31 > div {\n  width: 48px;\n  height: 48px;\n}\n._container_1ckiv_8 {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  color: rgba(255, 255, 255, 0.7);\n  font-weight: var(--body-font-weight-bold);\n  font-size: 16px;\n  background-color: rgba(0, 0, 0, 0.54);\n  border: 1px solid rgba(255, 255, 255, 0.34);\n  border-radius: 4px;\n  transition: border 0.2s ease;\n}\n._container_1ckiv_8:focus-within {\n  color: #fff;\n  border-color: #fff;\n}\n._input_1ckiv_53 {\n  width: 100%;\n  min-height: 48px;\n  padding: 14px 16px;\n  color: inherit;\n  font-size: 16px;\n  line-height: 18px;\n  text-align: center;\n  background: transparent;\n  border: none;\n  outline: none;\n  appearance: none;\n}\n._input_1ckiv_53::-webkit-inner-spin-button {\n  display: none;\n}\n._input_1ckiv_53[name=date] {\n  width: 43px;\n  padding-right: 4px;\n}\n._input_1ckiv_53[name=month] {\n  width: 35px;\n  padding-right: 4px;\n  padding-left: 4px;\n}\n._input_1ckiv_53[name=year] {\n  width: 60px;\n  padding-left: 4px;\n}\n._helperText_1ckiv_5 {\n  margin-top: 4px;\n  font-size: 12px;\n  text-align: left;\n}";
let json = {"dateField":"_dateField_1ckiv_1","error":"_error_1ckiv_5","helperText":"_helperText_1ckiv_5","container":"_container_1ckiv_8","disabled":"_disabled_1ckiv_11","label":"_label_1ckiv_19","control":"_control_1ckiv_31","input":"_input_1ckiv_53"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}