import styles from "./style.module.css";
import ReactDom from "react-dom";

export default function Modal({ open, handleSaveAndClose, children }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <div className={styles.overlay} onClick={handleSaveAndClose}>
      <div className={styles.modal}>{children}</div>
    </div>,
    document.getElementById("portal")
  );
}
