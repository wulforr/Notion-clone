import TaskBoardHeader from "../TaskBoardHeader/TaskBoardHeader";
import TaskGroup from "../TaskGroup/TaskGroup";
import styles from "./style.module.css";
import { useState, useEffect, useRef } from "react";
import { initialData } from "./initialData";
import {
  getValueFromLocalStorage,
  setValueToLocalStorage,
} from "../../utils/localStorage";

export default function TaskBoard() {
  const [groups, setGroups] = useState(initialData);
  const [draggedCard, setDraggedCard] = useState(null);
  const [droppedOverCardInfo, setDroppedOverCardInfo] = useState(null);
  const [newCard, setNewCard] = useState(null);
  const newCardRef = useRef(null);

  useEffect(() => {
    setGroups(getValueFromLocalStorage("groups", initialData));
    // setGroups(initialData);
  }, []);

  useEffect(() => {
    setValueToLocalStorage("groups", groups);
  }, [groups]);

  useEffect(() => {
    if (newCard) {
      console.log("focusing on", newCardRef);
      const ele = newCardRef.current?.el.current;
      ele?.focus();
      ele?.addEventListener("blur", () => {
        const value = ele?.innerText;
        console.log("value is", value);
        const updatedGroups = groups.map((group) => {
          if (group.groupId === newCard.groupId) {
            group.groupCards = group.groupCards.map((card) => {
              if (card.cardId === newCard.cardId) {
                card.cardTitle = value;
              }
              return card;
            });
          }
          return group;
        });
        setGroups([...updatedGroups]);
        setNewCard(null);
      });
    }
  }, [groups, newCard]);

  const updateAllGroups = (updatedGroups) => {
    setGroups(updatedGroups);
  };

  return (
    <div className={styles.taskBoard}>
      <TaskBoardHeader />
      <div className={styles.taskGroupsWrapper}>
        {groups.map((group) => (
          <TaskGroup
            key={group.groupId}
            group={group}
            setGroups={setGroups}
            draggedCard={draggedCard}
            setDraggedCard={setDraggedCard}
            groups={groups}
            droppedOverCardInfo={droppedOverCardInfo}
            setDroppedOverCardInfo={setDroppedOverCardInfo}
            newCard={newCard}
            setNewCard={setNewCard}
            newCardRef={newCardRef}
            updateAllGroups={updateAllGroups}
          />
        ))}
      </div>
    </div>
  );
}
