
export let code = "._dialogBackButton_1pa6f_1 {\n  position: absolute;\n  top: 16px;\n  left: 16px;\n  width: 48px;\n  height: 48px;\n}";
let json = {"dialogBackButton":"_dialogBackButton_1pa6f_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}