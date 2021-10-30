import TaskCard from "../TaskCard/TaskCard";
import styles from "./style.module.css";
import { useRef, useState } from "react";

export default function TaskGroup({
  group,
  setGroups,
  setSelectedCard,
  selectedCard,
}) {
  //   let draggedItem = useRef();

  //   onDragStart = (e, index) => {
  //     draggedItem.current = this.state.items[index];
  //     // e.dataTransfer.effectAllowed = "move";
  //     // e.dataTransfer.setData("text/html", e.target.parentNode);
  //     // e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  //   };

  // const onDragOver = (e) => {
  //   // const draggedOverItem = this.state.items[index];

  //   // if the item is dragged over itself, ignore
  //   // if (draggedItem.current === draggedOverItem) {
  //   //   return;
  //   // }

  //   // filter out the currently dragged item
  //   // let items = this.state.items.filter((item) => item !== draggedItem.current);

  //   // add the dragged item after the dragged over item
  //   // items.splice(index, 0, draggedItem.current);

  //   // this.setState({ items });
  //   e.preventDefault();
  // };

  // const onDrop = (e, index) => {
  //   // const id = e.dataTransfer.getData("id");
  //   // const prev = e.dataTransfer.getData("prev");
  //   console.log("selectedCard", selectedCard);
  //   // console.log("id", id, prev, index);
  //   const tempGroups = groups.map((ele, ind) => {
  //     if (ind === index) {
  //       ele.cards = [...ele.cards, selectedCard.cardId];
  //     } else if (ind == selectedCard.prevGroup) {
  //       console.log("in else if");
  //       ele.cards = ele.cards.filter((card) => card != selectedCard.cardId);
  //     }
  //     return ele;
  //   });
  //   setGroups(tempGroups);
  // };

  //   const onDragEnd = (e) => {
  //     // this.draggedIdx = null;
  //     e.preventDefault();
  //   };

  return (
    <div
      className={styles.taskGroup}
      // onDrop={(e) => onDrop(e, group.groupId)}
      // onDragOver={onDragOver}
    >
      <div className={styles.groupHeader}>{group.groupTitle}</div>
      <div className={styles.taskCardsWrapper}>
        {group.groupCards.map((card) => (
          <TaskCard
            key={card.cardId}
            card={card}
            setSelectedCard={setSelectedCard}
          />
        ))}
      </div>
      <div className={styles.groupFooter}></div>
    </div>
  );
}
