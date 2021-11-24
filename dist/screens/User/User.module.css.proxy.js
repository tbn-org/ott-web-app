
export let code = "._user_wdkvv_1 {\n  display: flex;\n  justify-content: center;\n  margin: 56px 64px;\n  color: var(--primary-color);\n  font-family: var(--body-alt-font-family);\n}\n@media screen and (max-width: 479px) {\n  ._user_wdkvv_1 {\n    margin: 0 16px;\n  }\n}\n@media screen and (min-width: 480px) and (max-width: 1023px) {\n  ._user_wdkvv_1 {\n    margin: 0 24px;\n  }\n}\n._leftColumn_wdkvv_19 {\n  width: 250px;\n  margin-right: 24px;\n  padding-left: 19px;\n  font-weight: var(--body-font-weight-bold);\n  font-size: 18px;\n  font-style: normal;\n  line-height: 20px;\n  letter-spacing: 0.5px;\n}\nul {\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n}\n._button_wdkvv_36 {\n  margin-bottom: 16px;\n}\n._logoutLi_wdkvv_40 {\n  margin-bottom: 0;\n  padding-top: 16px;\n  border-top: 1px solid rgba(255, 255, 255, 0.32);\n}\n._logoutLi_wdkvv_40 > a {\n  margin-bottom: 0;\n}\n._mainColumn_wdkvv_49 {\n  width: 100%;\n  max-width: 750px;\n}\n._panel_wdkvv_54 {\n  margin-bottom: 24px;\n  padding: 16px;\n  font-weight: normal;\n  font-size: 16px;\n  font-style: normal;\n  line-height: 18px;\n  letter-spacing: 0.15px;\n  background: rgba(255, 255, 255, 0.08);\n  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12), 0 3px 5px rgba(0, 0, 0, 0.2);\n}\n._panelHeader_wdkvv_66 {\n  margin-bottom: 16px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.32);\n}\n._panelHeader_wdkvv_66 > h3 {\n  font-weight: var(--body-font-weight-bold);\n  font-size: 24px;\n  line-height: 26px;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.14), 0 3px 4px rgba(0, 0, 0, 0.12), 0 1px 5px rgba(0, 0, 0, 0.2);\n}\n._checkbox_wdkvv_78 {\n  display: flex;\n  align-items: center;\n}\n._checkbox_wdkvv_78 > input {\n  margin-right: 10px;\n}";
let json = {"user":"_user_wdkvv_1","leftColumn":"_leftColumn_wdkvv_19","button":"_button_wdkvv_36","logoutLi":"_logoutLi_wdkvv_40","mainColumn":"_mainColumn_wdkvv_49","panel":"_panel_wdkvv_54","panelHeader":"_panelHeader_wdkvv_66","checkbox":"_checkbox_wdkvv_78"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}