
export let code = "._dialog_18t28_1 {\n  width: 100vw;\n  max-width: 450px;\n  max-height: 90vh;\n  padding: 24px;\n  overflow-y: auto;\n  color: #fff;\n  background-color: #202020;\n  border-radius: 6px;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n._dialog_18t28_1::-webkit-scrollbar {\n  display: none;\n}";
let json = {"dialog":"_dialog_18t28_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}