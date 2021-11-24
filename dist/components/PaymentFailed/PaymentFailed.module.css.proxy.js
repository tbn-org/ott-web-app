
export let code = "._title_82pz9_1 {\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n}\n\n._message_82pz9_6 {\n  font-size: 16px;\n}";
let json = {"title":"_title_82pz9_1","message":"_message_82pz9_6"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}