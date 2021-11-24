
export let code = "._formFeedback_1hgsg_1 {\n  margin-bottom: 24px;\n  padding: 16px;\n  color: #fff;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 18px;\n  text-align: left;\n  border-radius: 4px;\n}\n\n._error_1hgsg_11 {\n  color: #fff;\n  background-color: #ff0c3e;\n}\n\n._warning_1hgsg_16 {\n  color: #fff;\n  background-color: #e9a95b;\n}\n\n._success_1hgsg_21 {\n  color: #000;\n  background-color: #5aae4a;\n}";
let json = {"formFeedback":"_formFeedback_1hgsg_1","error":"_error_1hgsg_11","warning":"_warning_1hgsg_16","success":"_success_1hgsg_21"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}