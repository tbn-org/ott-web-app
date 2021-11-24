
export let code = "._errorPage_1pi7f_1 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 70vh;\n}\n\n._box_1pi7f_8 {\n  max-width: 500px;\n  padding: 12px;\n}\n\n._title_1pi7f_13 {\n  margin-bottom: 24px;\n  color: #fff;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 34px;\n}\n\n._main_1pi7f_20 {\n  color: #fff;\n}\n\n._main_1pi7f_20 > h6 {\n  margin-bottom: 16px;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 20px;\n}\n\n@media screen and (max-width: 479px) {\n  ._title_1pi7f_13 {\n    font-size: 24px;\n  }\n}";
let json = {"errorPage":"_errorPage_1pi7f_1","box":"_box_1pi7f_8","title":"_title_1pi7f_13","main":"_main_1pi7f_20"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}