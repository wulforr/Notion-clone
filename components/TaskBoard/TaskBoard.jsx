import TaskBoardHeader from "../TaskBoardHeader/TaskBoardHeader";
import TaskGroup from "../TaskGroup/TaskGroup";
import styles from "./style.module.css";
import { useState, useEffect, useRef } from "react";
import { initialData } from "./initialData";
import {
  getValueFromLocalStorage,
  setValueToLocalStorage,
} from "../../utils/localStorage";
import { BsPlusLg } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

export default function TaskBoard() {
  const [groups, setGroups] = useState(initialData);
  const [draggedCard, setDraggedCard] = useState(null);
  const [droppedOverCardInfo, setDroppedOverCardInfo] = useState(null);
  const [newCard, setNewCard] = useState(null);
  const newCardRef = useRef(null);
  const [showNewGroupInput, setShowNewGroupInput] = useState(false);
  const [newGroupTitle, setNewGroupTitle] = useState("");
  const newGroupInputRef = useRef(null);

  useEffect(() => {
    setGroups(getValueFromLocalStorage("groups", initialData));
    setGroups(initialData);
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

  useEffect(() => {
    if (showNewGroupInput) {
      newGroupInputRef.current.focus();
    }
  }, [showNewGroupInput]);

  const updateAllGroups = (updatedGroups) => {
    setGroups(updatedGroups);
  };

  const handleAddGroup = () => {
    setShowNewGroupInput(true);
  };

  const handleGroupTitleChange = (e) => {
    setNewGroupTitle(e.target.value);
  };

  const addNewGroup = () => {
    const newGroupInfo = {
      groupId: uuidv4(),
      groupTitle: newGroupTitle,
      groupCards: [],
    };
    setGroups((groups) => [...groups, newGroupInfo]);
    setShowNewGroupInput("");
    setNewGroupTitle("");
  };

  const handleKeyDown = (e) => {
    console.log("pressing");
    if (e.keyCode === 13) {
      console.log("Enter pressed");
      addNewGroup();
    }
  };

  const handleBlur = () => {
    addNewGroup();
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
        <div>
          {showNewGroupInput ? (
            <input
              type="text"
              onChange={handleGroupTitleChange}
              value={newGroupTitle}
              className={styles.addNewGroupInput}
              ref={newGroupInputRef}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          ) : (
            <div className={styles.addNewGroup} onClick={handleAddGroup}>
              <BsPlusLg /> Add a group
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
