
export let code = "._filterRow_1t37d_1 {\n  display: flex;\n  align-items: center;\n  margin-left: 16px;\n}\n._filterRow_1t37d_1 > button {\n  margin: 0 4px;\n}\n._dropDown_1t37d_10 {\n  margin-bottom: 0;\n}\n._filterDropDown_1t37d_14 {\n  display: flex;\n  align-items: flex-end;\n}";
let json = {"filterRow":"_filterRow_1t37d_1","dropDown":"_dropDown_1t37d_10","filterDropDown":"_filterDropDown_1t37d_14"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}