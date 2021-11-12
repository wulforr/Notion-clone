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
  const [showNewGroupInput, setShowNewGroupInput] = useState(false);
  const [newGroupTitle, setNewGroupTitle] = useState("");
  const newGroupInputRef = useRef(null);

  useEffect(() => {
    setGroups(getValueFromLocalStorage("groups", initialData));
  }, []);

  useEffect(() => {
    setValueToLocalStorage("groups", groups);
  }, [groups]);

  useEffect(() => {
    if (showNewGroupInput) {
      newGroupInputRef.current.focus();
    }
  }, [showNewGroupInput]);

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

  const handleAddGroup = () => {
    setShowNewGroupInput(true);
  };

  const handleBlur = () => {
    addNewGroup();
  };

  const handleGroupTitleChange = (e) => {
    setNewGroupTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      addNewGroup();
    }
  };

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
