
export let code = "._searchBar_bqz0j_1 {\n  position: relative;\n  height: 36px;\n}\n\n._icon_bqz0j_6 {\n  position: absolute;\n  margin: 6px 8px;\n  pointer-events: none;\n}\n\n._input_bqz0j_12 {\n  display: inline-block;\n  width: 100%;\n  height: 100%;\n  padding: 0 36px 0 36px;\n  color: currentColor;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 16px;\n  background: rgba(0, 0, 0, 0.54);\n  border: 1px solid rgba(255, 255, 255, 0.32);\n  border-radius: 4px;\n  transition: border 0.1s ease, background 0.1s ease;\n}\n\n._input_bqz0j_12::-webkit-input-placeholder {\n  color: currentColor;\n  opacity: 0.5;\n}\n\n._input_bqz0j_12:focus, ._input_bqz0j_12:active {\n  border-color: #fff;\n  outline: none;\n}\n\n._clearButton_bqz0j_34 {\n  position: absolute;\n  top: -2px;\n  right: 0;\n}\n\n._clearButton_bqz0j_34 > svg {\n  width: 18px;\n  height: 18px;\n}";
let json = {"searchBar":"_searchBar_bqz0j_1","icon":"_icon_bqz0j_6","input":"_input_bqz0j_12","clearButton":"_clearButton_bqz0j_34"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}