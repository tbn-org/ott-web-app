
export let code = "._about_evfxj_1 {\n  max-width: 960px;\n  margin: 24px auto;\n  padding: 16px;\n  font-size: 16px;\n  line-height: 1.4em;\n  background-color: rgba(255, 255, 255, 0.1);\n}\n._about_evfxj_1 h1, ._about_evfxj_1 h2, ._about_evfxj_1 h3, ._about_evfxj_1 h4, ._about_evfxj_1 h5, ._about_evfxj_1 h6 {\n  font-weight: bold;\n}\n._about_evfxj_1 h1 {\n  font-size: 24px;\n}\n._about_evfxj_1 h2 {\n  font-size: 20px;\n}\n._about_evfxj_1 h3 {\n  font-size: 18px;\n}\n._about_evfxj_1 a,\n._about_evfxj_1 a:visited {\n  color: #3990ff;\n  text-decoration: none;\n}\n._about_evfxj_1 a:hover,\n._about_evfxj_1 a:visited:hover {\n  text-decoration: underline;\n}";
let json = {"about":"_about_evfxj_1"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}