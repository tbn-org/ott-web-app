
export let code = "._infoBox_10coc_1 {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 16px;\n  padding: 8px 16px;\n  font-size: 14px;\n  line-height: 18px;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.14), 0 3px 4px rgba(0, 0, 0, 0.12), 0 1px 5px rgba(0, 0, 0, 0.2);\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 4px;\n}\n._infoBox_10coc_1 > strong {\n  line-height: 16px;\n  letter-spacing: 0.25px;\n}\n._price_10coc_17 {\n  font-size: 14px;\n  line-height: 18px;\n}\n._price_10coc_17 > strong {\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n  line-height: 26px;\n}\n._cardDetails_10coc_27 {\n  display: flex;\n  margin-top: 32px;\n}";
let json = {"infoBox":"_infoBox_10coc_1","price":"_price_10coc_17","cardDetails":"_cardDetails_10coc_27"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}