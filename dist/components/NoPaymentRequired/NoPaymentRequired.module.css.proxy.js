
export let code = "._noPaymentRequired_170kq_1 p {\n  font-weight: var(--body-font-weight-bold);\n  font-size: 20px;\n  text-align: center;\n}";
let json = {"noPaymentRequired":"_noPaymentRequired_170kq_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}