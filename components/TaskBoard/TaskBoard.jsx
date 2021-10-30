import TaskBoardHeader from "../TaskBoardHeader/TaskBoardHeader";
import TaskGroup from "../TaskGroup/TaskGroup";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { initialData } from "./initialData";
import {
  getValueFromLocalStorage,
  setValueToLocalStorage,
} from "../../utils/localStorage";

export default function TaskBoard() {
  const [groups, setGroups] = useState(initialData);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    setGroups(getValueFromLocalStorage("groups", initialData));
  }, []);

  useEffect(() => {
    setValueToLocalStorage("groups", groups);
  }, [groups]);

  return (
    <div className={styles.taskBoard}>
      <TaskBoardHeader />
      <div className={styles.taskGroupsWrapper}>
        {groups.map((group) => (
          <TaskGroup
            key={group.groupId}
            group={group}
            setGroups={setGroups}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        ))}
      </div>
    </div>
  );
}