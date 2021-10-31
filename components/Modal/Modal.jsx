import styles from "./style.module.css";
import ReactDom from "react-dom";
import ContentEditable from "react-contenteditable";
import { useRef } from "react";

export default function Modal({ open, handleSaveAndClose, children }) {
  //   const titleRef = useRef(title);
  //   const descriptionRef = useRef(description);

  //   const handleChange = (evt, ref) => {
  //     ref.current = evt.target.value;
  //   };

  //   const handleBlur = () => {
  //     console.log(titleRef.current);
  //   };
  console.log("open in modal", open);

  //   const handleSave = (e) => {
  //     handleSaveAndClose(e, titleRef.current, descriptionRef.current);
  //   };

  if (!open) return null;
  return ReactDom.createPortal(
    <div className={styles.overlay} onClick={handleSaveAndClose}>
      <div className={styles.modal}>
        {/* <button onClick={handleSaveAndClose}>Close</button> */}
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
