
export let code = "._icon_23h0x_1 {\n  width: 24px;\n  height: 24px;\n  fill: #fff;\n}";
let json = {"icon":"_icon_23h0x_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}