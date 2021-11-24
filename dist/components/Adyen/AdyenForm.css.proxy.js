// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".adyen-checkout__card-input .adyen-checkout__card__form .adyen-checkout__label__text {\n  color: #fff;\n  font-family: var(--body-font-family);\n  font-size: 16px;\n  line-height: 18px;\n}\n.adyen-checkout__card-input .adyen-checkout__card__form .adyen-checkout__error-text {\n  font-family: var(--body-font-family);\n  font-size: 14px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}