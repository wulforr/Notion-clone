import styles from "./style.module.css";

export default function TaskCard({
  card,
  setDraggedCard,
  groupId,
  //   onDragOver,
}) {
  const onDragStart = () => {
    // e.dataTransfer.setData("id", name);
    // e.dataTransfer.setData("prev", index);
    //   console.log("setting prev as", index);
    //   setSelectedCard({
    //     cardId: name,
    //     prevGroup: index,
    //   });
    setDraggedCard({
      cardInfo: card,
      prevGroup: groupId,
    });
  };

  const onDragEnd = () => {
    setDraggedCard(null);
  };
  return (
    <div
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={styles.taskCard}
      //   onDragOver={() => onDragOver(card)}
    >
      {card.cardTitle}
    </div>
  );
}
