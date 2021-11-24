// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ":root {\n  --primary-color: #fff;\n  --body-background-color: #141523;\n  --body-font-family: Helvetica, Arial, sans-serif;\n  --body-alt-font-family: Trebuchet MS, Helvetica, Arial, sans-serif;\n  --body-font-weight-regular: 500;\n  --body-font-weight-bold: 700;\n  --body-color: #fff;\n  --card-color: #fff;\n  --card-border-hover-color: #fff;\n  --card-tag-bg: #2b2c39;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  color: var(--body-color);\n  font-family: var(--body-font-family);\n  font-size: 16px;\n  background-color: var(--body-background-color);\n  -webkit-font-smoothing: antialiased;\n}\n\nbutton {\n  width: auto;\n  margin: 0;\n  padding: 0;\n  overflow: visible;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  background: transparent;\n  border: none;\n  border: 0;\n  outline: none;\n  appearance: none;\n  -webkit-font-smoothing: inherit;\n  -moz-osx-font-smoothing: inherit;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n  padding: 0;\n  font: inherit;\n}\n\n*,\n::after,\n::before {\n  box-sizing: border-box;\n}\n\n@media screen and (max-width: 1023px) {\n  body {\n    font-size: 18px;\n  }\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}