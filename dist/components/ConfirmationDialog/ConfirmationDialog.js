import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import Dialog from "../Dialog/Dialog.js";
import Button from "../Button/Button.js";
import styles from "./ConfirmationDialog.module.css.proxy.js";
const ConfirmationDialog = ({open, title, body, onConfirm, onClose}) => {
  const {t} = useTranslation("common");
  return /* @__PURE__ */ React.createElement(Dialog, {
    open,
    onClose
  }, /* @__PURE__ */ React.createElement("h2", {
    className: styles.title
  }, title), /* @__PURE__ */ React.createElement("p", {
    className: styles.body
  }, body), /* @__PURE__ */ React.createElement(Button, {
    className: styles.confirmButton,
    label: t("confirmation_dialog.confirm"),
    variant: "contained",
    color: "primary",
    onClick: onConfirm,
    fullWidth: true
  }), /* @__PURE__ */ React.createElement(Button, {
    label: t("confirmation_dialog.close"),
    variant: "outlined",
    onClick: onClose,
    fullWidth: true
  }));
};
export default ConfirmationDialog;
