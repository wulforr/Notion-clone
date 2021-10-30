import styles from "./style.module.css";
export default function TaskCard({ card, setSelectedCard, index }) {
  //   const onDragStart = (e, name) => {
  //     // e.dataTransfer.setData("id", name);
  //     // e.dataTransfer.setData("prev", index);
  //     console.log("setting prev as", index);
  //     setSelectedCard({
  //       cardId: name,
  //       prevGroup: index,
  //     });
  //   };
  return (
    <div
      //   draggable="true"
      //   onDragStart={(e) => onDragStart(e, card.cardId)}
      className={styles.taskCard}
    >
      {card.cardTitle}
    </div>
  );
}
