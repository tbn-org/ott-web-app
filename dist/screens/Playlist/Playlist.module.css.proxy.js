
export let code = "._playlist_17big_1 {\n  margin: 0 64px;\n  color: var(--primary-color);\n  font-family: var(--body-alt-font-family);\n  text-align: center;\n}\n._playlist_17big_1 > main {\n  margin-top: 6px;\n}\n@media screen and (max-width: 479px) {\n  ._playlist_17big_1 {\n    margin: 0 16px;\n  }\n}\n@media screen and (min-width: 480px) and (max-width: 1023px) {\n  ._playlist_17big_1 {\n    margin: 0 32px;\n  }\n}\n@media screen and (min-width: 1024px) and (max-width: 1200px) {\n  ._playlist_17big_1 {\n    margin: 0 48px;\n  }\n}\n._main_17big_26 {\n  margin: -8px;\n}\n._header_17big_30 {\n  display: flex;\n  align-items: center;\n  height: 36px;\n  margin: 24px 0;\n}\n._header_17big_30 > h2 {\n  font-family: var(--body-alt-font-family);\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n}\n@media screen and (max-width: 1023px) {\n  ._header_17big_30 {\n    justify-content: space-between;\n  }\n}\n._cell_17big_47 {\n  padding: 8px;\n}\n._error_17big_51 {\n  margin: 20px;\n  color: var(--primary-color);\n}";
let json = {"playlist":"_playlist_17big_1","main":"_main_17big_26","header":"_header_17big_30","cell":"_cell_17big_47","error":"_error_17big_51"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}