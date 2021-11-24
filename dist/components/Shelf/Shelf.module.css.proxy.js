
export let code = "._shelf_iejgn_1 {\n  margin: 0 0;\n  color: var(--primary-color);\n  font-family: var(--body-alt-font-family);\n}\n._shelf_iejgn_1:hover ._chevron_iejgn_6 {\n  opacity: 1;\n}\n._shelf_iejgn_1:hover ._chevron_iejgn_6._disabled_iejgn_9 {\n  opacity: 0.3;\n}\n._title_iejgn_13 {\n  width: 100%;\n  min-height: 28px;\n  margin-bottom: 12px;\n  overflow: hidden;\n  color: var(--card-color);\n  font-family: var(--body-alt-font-family);\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n._chevron_iejgn_6 {\n  padding: 12px 0;\n  outline-color: var(--highlight-color, white);\n  cursor: pointer;\n  opacity: 0;\n  transition: transform 0.3s ease-out, opacity 0.3s ease-out;\n}\n._chevron_iejgn_6 > svg {\n  width: 30px;\n  height: 30px;\n}\n._chevron_iejgn_6._disabled_iejgn_9 {\n  cursor: default;\n}\n._chevron_iejgn_6._disabled_iejgn_9:hover {\n  transform: none;\n}\n._chevron_iejgn_6:hover {\n  transform: scale(1.2);\n}\n._dot_iejgn_47 {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin: 0 5px;\n  background-color: rgba(254, 254, 254, 0.2);\n  border-radius: 50%;\n  transition: all 200ms ease;\n}\n._dot_iejgn_47._active_iejgn_56 {\n  background-color: var(--primary-color);\n  transform: scale(1.1);\n}\n._error_iejgn_61 {\n  color: var(--card-color);\n  font-family: var(--body-alt-font-family);\n}";
let json = {"shelf":"_shelf_iejgn_1","chevron":"_chevron_iejgn_6","disabled":"_disabled_iejgn_9","title":"_title_iejgn_13","dot":"_dot_iejgn_47","active":"_active_iejgn_56","error":"_error_iejgn_61"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}