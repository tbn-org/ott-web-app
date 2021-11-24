
export let code = "._popover_1qhjo_1 {\n  position: absolute;\n  top: 55px;\n  right: 5px;\n  z-index: 15;\n  width: 250px;\n  overflow: hidden;\n  border-radius: 5px 5px;\n}\n._popover_1qhjo_1 > div {\n  z-index: 15;\n}";
let json = {"popover":"_popover_1qhjo_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}