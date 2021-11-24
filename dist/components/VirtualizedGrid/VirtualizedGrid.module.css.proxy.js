
export let code = "._grid_1vxgn_1 {\n  overflow: visible !important;\n}\n._grid_1vxgn_1 > div {\n  overflow: visible !important;\n}";
let json = {"grid":"_grid_1vxgn_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}