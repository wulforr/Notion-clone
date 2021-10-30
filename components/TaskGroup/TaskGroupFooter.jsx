import styles from "./style.module.css";
import { BsPlusLg } from "react-icons/bs";

export default function TaskGroupFooter({ addCard }) {
  return (
    <div className={styles.groupFooter} onClick={addCard}>
      <BsPlusLg /> New
    </div>
  );
}
