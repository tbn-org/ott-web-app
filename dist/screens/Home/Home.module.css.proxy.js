
export let code = "._home_1i652_1 {\n  max-width: 100vw;\n  overflow-x: hidden;\n}\n\n._list_1i652_6 {\n  overflow: visible !important;\n}\n\n._list_1i652_6 > div {\n  overflow: visible !important;\n}\n\n._shelfContainer_1i652_13 {\n  padding: 12px 56px;\n}\n\n._shelfContainer_1i652_13._featured_1i652_16 {\n  padding: 12px 20%;\n}\n\n@media screen and (max-width: 479px) {\n  ._shelfContainer_1i652_13 {\n    padding: 8px 60px 8px 16px;\n  }\n  ._shelfContainer_1i652_13._featured_1i652_16 {\n    padding: 24px 16px;\n  }\n}\n\n@media screen and (min-width: 480px) and (max-width: 1023px) {\n  ._shelfContainer_1i652_13 {\n    padding: 0 32px;\n  }\n  ._shelfContainer_1i652_13._featured_1i652_16 {\n    padding: 24px 10%;\n  }\n}";
let json = {"home":"_home_1i652_1","list":"_list_1i652_6","shelfContainer":"_shelfContainer_1i652_13","featured":"_featured_1i652_16"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}