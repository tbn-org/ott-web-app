
export let code = "._menuButton_z2u65_1 {\n  position: relative;\n  display: inline-flex;\n  justify-content: inherit;\n  align-items: center;\n  width: 100%;\n  min-height: 44px;\n  padding: 0 16px;\n  color: #fff;\n  font-family: var(--body-alt-font-family);\n  font-weight: var(--body-font-weight-bold);\n  font-size: 18px;\n  text-align: center;\n  text-decoration: none;\n  background: transparent;\n  outline: none;\n  cursor: pointer;\n  opacity: 0.7;\n  transition: background 0.1s ease;\n}\n._menuButton_z2u65_1._small_z2u65_21 {\n  padding: 0 24px;\n  font-size: 16px;\n}\n._menuButton_z2u65_1._small_z2u65_21 > ._startIcon_z2u65_25 {\n  margin-right: 24px;\n}\n@media (hover: hover) and (pointer: fine) {\n  ._menuButton_z2u65_1:hover, ._menuButton_z2u65_1:active {\n    background: rgba(255, 255, 255, 0.08);\n    opacity: 1;\n  }\n}\n._active_z2u65_35 {\n  background: rgba(255, 255, 255, 0.08);\n  opacity: 1;\n}\n._startIcon_z2u65_25 {\n  display: flex;\n  align-items: center;\n  height: 100%;\n  margin-right: 12px;\n}\n._startIcon_z2u65_25 > svg {\n  width: 25px;\n  height: 25px;\n  fill: currentColor;\n}\n@media screen and (min-width: 480px) and (max-width: 1023px) {\n  ._startIcon_z2u65_25 > svg {\n    width: 20px;\n    height: 20px;\n  }\n}";
let json = {"menuButton":"_menuButton_z2u65_1","small":"_small_z2u65_21","startIcon":"_startIcon_z2u65_25","active":"_active_z2u65_35"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}