import TaskCard from "../TaskCard/TaskCard";
import TaskGroupHeader from "./TaskGroupHeader";
import styles from "./style.module.css";

export default function TaskGroup({
  group,
  groups,
  setGroups,
  draggedCard,
  setDraggedCard,
  setDroppedOverCardInfo,
  droppedOverCardInfo,
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

  return (
    <div
      className={styles.taskGroup}
      onDrop={() => onDrop(group.groupId)}
      onDragOver={(e) => e.preventDefault()}
    >
      <TaskGroupHeader
        groupTitle={group.groupTitle}
        totalCards={group.groupCards.length}
      />
      <div className={styles.taskCardsWrapper}>
        {group.groupCards.map((card) => (
          <TaskCard
            key={card.cardId}
            card={card}
            setDraggedCard={setDraggedCard}
            groupId={group.groupId}
            onDragOver={onDragOver}
          />
        ))}
      </div>
      <div className={styles.groupFooter}>On footer</div>
    </div>
  );
}
