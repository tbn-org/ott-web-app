
export let code = "._episodes_cdvul_1 {\n  display: flex;\n  align-items: center;\n  margin-right: -4px;\n  padding-bottom: 16px;\n}\n._episodes_cdvul_1 > h3 {\n  font-family: var(--body-alt-font-family);\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n  line-height: 26px;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.14), 0 3px 4px rgba(0, 0, 0, 0.12), 0 1px 5px rgba(0, 0, 0, 0.2);\n}\n@media screen and (max-width: 1023px) {\n  ._episodes_cdvul_1 {\n    justify-content: space-between;\n  }\n}";
let json = {"episodes":"_episodes_cdvul_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}