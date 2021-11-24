
export let code = "._link_1uj3n_1 {\n  display: inline-block;\n  color: var(--primary-color);\n  font-weight: var(--body-font-weight-bold);\n  text-decoration: none;\n}\n._link_1uj3n_1:hover, ._link_1uj3n_1:focus {\n  text-decoration: underline;\n}";
let json = {"link":"_link_1uj3n_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}