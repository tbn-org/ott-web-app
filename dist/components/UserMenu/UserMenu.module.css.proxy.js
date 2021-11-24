
export let code = "._panel_12l5u_1 {\n  width: 100%;\n  height: 100%;\n  padding: 16px 0;\n  font-weight: normal;\n  font-size: 16px;\n  font-style: normal;\n  line-height: 18px;\n  letter-spacing: 0.15px;\n  background: #202020;\n  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12), 0 3px 5px rgba(0, 0, 0, 0.2);\n}\n\n._menuItems_12l5u_14 > li > a {\n  padding: 0 18px;\n  font-size: 16px;\n}\n\n._button_12l5u_19 {\n  margin-bottom: 16px;\n}\n\n._divider_12l5u_23 {\n  vertical-align: baseline;\n  background: transparent;\n  border: 0;\n  border-top: 1px solid rgba(255, 255, 255, 0.12);\n}\n\n._divider_12l5u_23._inPopover_12l5u_29 {\n  margin: 16px;\n  border-top: 1px solid rgba(255, 255, 255, 0.32);\n}";
let json = {"panel":"_panel_12l5u_1","menuItems":"_menuItems_12l5u_14","button":"_button_12l5u_19","divider":"_divider_12l5u_23","inPopover":"_inPopover_12l5u_29"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}