
export let code = "._modal_1bhca_1 {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: calc(100vh - calc(100vh - 100%));\n}\n\n._backdrop_1bhca_9 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.8);\n}\n\n._container_1bhca_18 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}";
let json = {"modal":"_modal_1bhca_1","backdrop":"_backdrop_1bhca_9","container":"_container_1bhca_18"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}