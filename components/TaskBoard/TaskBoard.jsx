import TaskBoardHeader from "../TaskBoardHeader/TaskBoardHeader";
import styles from "./style.module.css";

export default function TaskBoard() {
  return (
    <div className={styles.taskBoard}>
      <TaskBoardHeader />
    </div>
  );
}
