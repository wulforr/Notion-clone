import TaskCard from "../TaskCard/TaskCard";
import TaskGroupHeader from "./TaskGroupHeader";
import TaskGroupFooter from "./TaskGroupFooter";
import styles from "./style.module.css";
import { v4 as uuidv4 } from "uuid";

export default function TaskGroup({
  group,
  groups,
  setGroups,
  draggedCard,
  setDraggedCard,
  setDroppedOverCardInfo,
  droppedOverCardInfo,
  newCard,
  setNewCard,
  newCardRef,
}) {
  const { groupId, groupCards, groupTitle } = group;
  const onDragOver = (cardInfo) => {
    setDroppedOverCardInfo(cardInfo);
  };

  const findIndexOfCard = (cards, cardId) => {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].cardId === cardId) {
        return i;
      }
    }
    return -1;
  };

  const onDrop = () => {
    if (draggedCard.cardInfo.cardId === droppedOverCardInfo.cardId) {
      return;
    }
    // adding of card in dropped group
    const copyOfCards = group.groupCards.filter(
      (card) => card.cardId != draggedCard.cardInfo.cardId
    );
    copyOfCards.splice(
      findIndexOfCard(copyOfCards, droppedOverCardInfo.cardId),
      0,
      draggedCard.cardInfo
    );
    updateGroup(groupId, { ...group, groupCards: copyOfCards });

    //removing card from previous group
    const prevGroupId = draggedCard.prevGroup;
    if (prevGroupId !== groupId) {
      const copyOfPrevGroup = {
        ...groups.filter((group) => group.groupId === prevGroupId)[0],
      };
      copyOfPrevGroup.groupCards = copyOfPrevGroup.groupCards.filter(
        (card) => card.cardId != draggedCard.cardInfo.cardId
      );
      updateGroup(prevGroupId, copyOfPrevGroup);
    }
  };

  const handleAddCard = (location = "bottom") => {
    const newCardInfo = {
      cardId: uuidv4(),
      cardTitle: "",
      cardDescription: "",
    };
    let groupCardsAfterAdding;

    if (location === "bottom") {
      groupCardsAfterAdding = [...groupCards, newCardInfo];
    } else {
      groupCardsAfterAdding = [newCardInfo, ...groupCards];
    }

    const updatedGroupAfterAdding = {
      ...group,
      groupCards: groupCardsAfterAdding,
    };

    updateGroup(groupId, updatedGroupAfterAdding);

    setNewCard({
      ...newCardInfo,
      groupId,
    });
  };

  const statusOptions = groups.map((group) => ({
    value: group.groupTitle,
    label: group.groupTitle,
  }));

  const updateAllGroups = (groups, groupId, updatedGroup) => {
    const copyOfGroups = [...groups];
    const index = copyOfGroups.findIndex((group) => group.groupId === groupId);
    copyOfGroups.splice(index, 1, updatedGroup);
    return copyOfGroups;
  };

  const updateGroup = (groupId, updatedGroup) => {
    setGroups((groups) => updateAllGroups(groups, groupId, updatedGroup));
  };

  return (
    <div
      className={styles.taskGroup}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <TaskGroupHeader
        groupTitle={groupTitle}
        totalCards={group.groupCards.length}
        addCard={() => handleAddCard("top")}
      />
      <div className={styles.taskCardsWrapper}>
        {group.groupCards.map((card) => (
          <TaskCard
            key={card.cardId}
            card={card}
            setDraggedCard={setDraggedCard}
            group={group}
            groups={groups}
            onDragOver={onDragOver}
            newCard={newCard}
            newCardRef={newCardRef}
            statusOptions={statusOptions}
            updateGroup={updateGroup}
          />
        ))}
      </div>
      <TaskGroupFooter addCard={() => handleAddCard("bottom")} />
    </div>
  );
}
