
export let code = "._layout_sfv6w_1 {\n  display: flex;\n  flex-direction: column;\n  min-height: calc(100vh - calc(100vh - 100%));\n}\n\n._main_sfv6w_7 {\n  flex: 1;\n}\n\n._footer_sfv6w_11 {\n  padding: 20px 40px;\n  line-height: 18px;\n  letter-spacing: 0.15px;\n  text-align: center;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.14), 0 3px 4px rgba(0, 0, 0, 0.12), 0 1px 5px rgba(0, 0, 0, 0.2);\n}\n\n._footer_sfv6w_11 > div > a,\n._footer_sfv6w_11 a:visited,\n._footer_sfv6w_11 a:active,\n._footer_sfv6w_11 a:hover {\n  color: #fff;\n  text-decoration: none;\n}\n\n._divider_sfv6w_26 {\n  width: 100%;\n  border: none;\n  border-top: 1px solid rgba(255, 255, 255, 0.12);\n}\n\n._buttonContainer_sfv6w_32 {\n  display: flex;\n  flex-direction: column;\n  padding: 0 16px;\n}\n\n._buttonContainer_sfv6w_32 > button:first-child {\n  margin-bottom: 8px;\n}";
let json = {"layout":"_layout_sfv6w_1","main":"_main_sfv6w_7","footer":"_footer_sfv6w_11","divider":"_divider_sfv6w_26","buttonContainer":"_buttonContainer_sfv6w_32"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}