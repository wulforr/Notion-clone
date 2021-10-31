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
  const onDragOver = (cardInfo) => {
    console.log("setting droppedOverCardInfo as", cardInfo);
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

  const onDrop = (groupId) => {
    console.log("calling onDrop", groupId, draggedCard, droppedOverCardInfo);
    if (draggedCard.cardInfo.cardId === droppedOverCardInfo.cardId) {
      return;
    }
    const updatedGroups = groups.map((group) => {
      if (group.groupId === groupId) {
        const cardsWithoutDraggedCard = group.groupCards.filter(
          (card) => card.cardId != draggedCard.cardInfo.cardId
        );

        cardsWithoutDraggedCard.splice(
          findIndexOfCard(cardsWithoutDraggedCard, droppedOverCardInfo.cardId),
          0,
          draggedCard.cardInfo
        );
        group.groupCards = [...cardsWithoutDraggedCard];
      } else if (group.groupId === draggedCard.prevGroup) {
        group.groupCards = group.groupCards.filter(
          (card) => card.cardId !== draggedCard.cardInfo.cardId
        );
      }
      return group;
    });
    setGroups(updatedGroups);
  };

  const handleAddCard = (location, groupId) => {
    const newCardInfo = {
      cardId: uuidv4(),
      cardTitle: "",
      cardDescription: "",
    };
    console.log("adding newCard at", groupId, newCardInfo);
    const groupsAfterAddingCard = groups.map((group) => {
      if (group.groupId === groupId) {
        if (location === "bottom") {
          group.groupCards = [...group.groupCards, newCardInfo];
        } else {
          group.groupCards = [newCardInfo, ...group.groupCards];
        }
      }
      return group;
    });
    setGroups(groupsAfterAddingCard);
    setNewCard({
      ...newCardInfo,
      groupId: group.groupId,
    });
  };

  const statusOptions = groups.map((group) => ({
    value: group.groupTitle,
    label: group.groupTitle,
  }));

  return (
    <div
      className={styles.taskGroup}
      onDrop={() => onDrop(group.groupId)}
      onDragOver={(e) => e.preventDefault()}
    >
      <TaskGroupHeader
        groupTitle={group.groupTitle}
        totalCards={group.groupCards.length}
        addCard={() => handleAddCard("top", group.groupId)}
      />
      <div className={styles.taskCardsWrapper}>
        {group.groupCards.map((card) => (
          <TaskCard
            key={card.cardId}
            card={card}
            setDraggedCard={setDraggedCard}
            group={group}
            onDragOver={onDragOver}
            newCard={newCard}
            newCardRef={newCardRef}
            statusOptions={statusOptions}
          />
        ))}
      </div>
      <TaskGroupFooter addCard={() => handleAddCard("bottom", group.groupId)} />
    </div>
  );
}
