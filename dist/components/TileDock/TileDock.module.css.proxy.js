
export let code = "._tileDock_vgwso_1 ul {\n  display: block;\n  margin: 0;\n  padding: 0;\n  white-space: nowrap;\n}\n\n._tileDock_vgwso_1 li {\n  display: inline-block;\n  white-space: normal;\n  list-style-type: none;\n}\n\n._notInView_vgwso_14 {\n  opacity: 0.5;\n}\n\n@media (hover: hover) and (pointer: fine) {\n  ._notInView_vgwso_14 {\n    opacity: 0.3;\n  }\n}\n\n._tileDock_vgwso_1 ._leftControl_vgwso_23 {\n  position: absolute;\n  top: calc(50% + 25px);\n  left: 0;\n  z-index: 1;\n  transform: translateY(-100%);\n}\n\n._tileDock_vgwso_1 ._rightControl_vgwso_31 {\n  position: absolute;\n  top: calc(50% + 25px);\n  right: 0;\n  z-index: 1;\n  transform: translateY(-100%);\n}\n\n._emptyTile_vgwso_39::before {\n  content: \"\";\n  display: block;\n  padding-top: 56.25%;\n  background: rgba(255, 255, 255, 0.12);\n  border-radius: 4px;\n}\n\n._dots_vgwso_47 {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  margin-top: 12px;\n}";
let json = {"tileDock":"_tileDock_vgwso_1","notInView":"_notInView_vgwso_14","leftControl":"_leftControl_vgwso_23","rightControl":"_rightControl_vgwso_31","emptyTile":"_emptyTile_vgwso_39","dots":"_dots_vgwso_47"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}