
export let code = "._BlurBackground_1ajvr_1 {\n  position: fixed;\n  z-index: -1;\n  box-sizing: border-box;\n  width: 100vw;\n  height: 100vh;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: cover;\n  opacity: 0;\n  filter: blur(30px);\n}";
let json = {"BlurBackground":"_BlurBackground_1ajvr_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}