import styles from "./style.module.css";
import { BsPlusLg } from "react-icons/bs";

export default function TaskGroupFooter() {
  return (
    <div className={styles.groupFooter}>
      <BsPlusLg /> New
    </div>
  );
}
