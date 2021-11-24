
export let code = "._title_1hl3t_1 {\n  margin-bottom: 24px;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n}\n\n._link_1hl3t_7 {\n  margin-bottom: 24px;\n}\n\n._bottom_1hl3t_11 {\n  margin-top: 24px;\n  text-align: center;\n}";
let json = {"title":"_title_1hl3t_1","link":"_link_1hl3t_7","bottom":"_bottom_1hl3t_11"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}