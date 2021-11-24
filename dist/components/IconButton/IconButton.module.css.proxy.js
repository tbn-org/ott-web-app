
export let code = "._iconButton_ynwnq_1 {\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  width: 40px;\n  height: 40px;\n  outline: var(--highlight-color, white) none;\n  cursor: pointer;\n  opacity: 0.7;\n  transition: transform 0.1s ease;\n}\n._iconButton_ynwnq_1:hover, ._iconButton_ynwnq_1:focus {\n  transform: scale(1.1);\n  opacity: 1;\n}";
let json = {"iconButton":"_iconButton_ynwnq_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}