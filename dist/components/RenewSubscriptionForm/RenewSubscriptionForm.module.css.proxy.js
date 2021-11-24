
export let code = "._title_xo889_1 {\n  margin-bottom: 16px;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n}\n\n._infoBox_xo889_7 {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n  padding: 8px 16px;\n  font-size: 14px;\n  line-height: 18px;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.14), 0 3px 4px rgba(0, 0, 0, 0.12), 0 1px 5px rgba(0, 0, 0, 0.2);\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 4px;\n}\n\n._infoBox_xo889_7 > strong {\n  line-height: 16px;\n  letter-spacing: 0.25px;\n}\n\n._price_xo889_24 {\n  font-size: 14px;\n  line-height: 18px;\n}\n\n._price_xo889_24 > strong {\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n  line-height: 26px;\n}\n\n._confirmButton_xo889_34 {\n  margin-bottom: 8px;\n}";
let json = {"title":"_title_xo889_1","infoBox":"_infoBox_xo889_7","price":"_price_xo889_24","confirmButton":"_confirmButton_xo889_34"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}