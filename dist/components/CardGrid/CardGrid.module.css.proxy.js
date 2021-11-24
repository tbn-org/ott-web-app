
export let code = "._cell_1qk5h_1 {\n  padding: 4px;\n}\n\n._container_1qk5h_5 {\n  margin: 0 -4px;\n}";
let json = {"cell":"_cell_1qk5h_1","container":"_container_1qk5h_5"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}