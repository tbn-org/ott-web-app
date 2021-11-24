
export let code = "._modalCloseButton_15hlk_1 {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  width: 48px;\n  height: 48px;\n  opacity: 1;\n}\n._modalCloseButton_15hlk_1 > svg {\n  width: 28px;\n  height: 28px;\n  -webkit-filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.4));\n  /* stylelint-disable-line */\n  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.4));\n}\n._modalCloseButton_15hlk_1._hidden_15hlk_16 {\n  opacity: 0;\n  transition: opacity 0.6s ease;\n}\n@media screen and (max-width: 479px) {\n  ._modalCloseButton_15hlk_1 {\n    width: 24px;\n    height: 24px;\n  }\n  ._modalCloseButton_15hlk_1 > svg {\n    width: 14px;\n    height: 14px;\n  }\n}";
let json = {"modalCloseButton":"_modalCloseButton_15hlk_1","hidden":"_hidden_15hlk_16"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}