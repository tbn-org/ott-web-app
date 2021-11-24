
export let code = "._buffer_co3q5_1 {\n  position: relative;\n  display: inline-block;\n  width: 80px;\n  height: 80px;\n}\n\n._buffer_co3q5_1 div {\n  position: absolute;\n  display: block;\n  width: 64px;\n  height: 64px;\n  margin: 8px;\n  border: 4px solid #fff;\n  border-color: #fff transparent transparent transparent;\n  border-radius: 50%;\n  animation: _buffer_co3q5_1 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n}\n\n._small_co3q5_20 {\n  transform: scale(0.6);\n}\n\n._buffer_co3q5_1 div:nth-child(1) {\n  animation-delay: -0.45s;\n}\n\n._buffer_co3q5_1 div:nth-child(2) {\n  animation-delay: -0.3s;\n}\n\n._buffer_co3q5_1 div:nth-child(3) {\n  animation-delay: -0.15s;\n}\n\n@keyframes _buffer_co3q5_1 {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}";
let json = {"buffer":"_buffer_co3q5_1","small":"_small_co3q5_20"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}