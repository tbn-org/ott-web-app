
export let code = "._title_gkrmh_1 {\n  margin-bottom: 24px;\n  font-family: Helvetica, Arial, sans-serif;\n  font-weight: 700;\n  font-size: 24px;\n}\n\n._body_gkrmh_8 {\n  font-family: Helvetica, Arial, sans-serif;\n}\n\n._confirmButton_gkrmh_12 {\n  margin-bottom: 8px;\n}";
let json = {"title":"_title_gkrmh_1","body":"_body_gkrmh_8","confirmButton":"_confirmButton_gkrmh_12"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}