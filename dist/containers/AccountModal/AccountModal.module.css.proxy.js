
export let code = "._banner_1xec5_1 {\n  text-align: center;\n}\n._banner_1xec5_1 > img {\n  max-width: 50%;\n}";
let json = {"banner":"_banner_1xec5_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}