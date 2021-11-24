
export let code = "._title_pxcok_1 {\n  margin-bottom: 24px;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n}\n\n._continue_pxcok_7 {\n  margin: 16px 0;\n}\n\n._bottom_pxcok_11 {\n  padding: 16px 0;\n  text-align: center;\n}\n\n._alreadyAccount_pxcok_16 {\n  font-size: 16px;\n}\n\n._login_pxcok_20 {\n  margin-left: 6px;\n  font-weight: var(--body-font-weight-bold);\n  cursor: pointer;\n}\n\n._login_pxcok_20:hover, ._login_pxcok_20:focus {\n  text-decoration: underline;\n}";
let json = {"title":"_title_pxcok_1","continue":"_continue_pxcok_7","bottom":"_bottom_pxcok_11","alreadyAccount":"_alreadyAccount_pxcok_16","login":"_login_pxcok_20"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}