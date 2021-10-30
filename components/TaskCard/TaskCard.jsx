import styles from "./style.module.css";
import { BsThreeDots } from "react-icons/bs";
import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";

export default function TaskCard({
  card,
  setDraggedCard,
  groupId,
  onDragOver,
  newCard,
  newCardRef,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const text = useRef("");

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  const handleBlur = () => {
    console.log(text.current);
  };

  //   const setFocus = () => {
  //     console.log(editDivRef.current);
  //     editDivRef.current.el.current.focus();
  //   };
  const onDragStart = () => {
    setDraggedCard({
      cardInfo: card,
      prevGroup: groupId,
    });
  };

  const onDragEnd = () => {
    setDraggedCard(null);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={styles.taskCard}
      onDragOver={() => onDragOver(card)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {card.cardId === newCard?.cardId ? (
        <ContentEditable
          html={text.current}
          onBlur={handleBlur}
          onChange={handleChange}
          ref={newCardRef}
        />
      ) : (
        <div>{card.cardTitle}</div>
      )}

      {isHovered && (
        <div className={styles.menu}>
          <BsThreeDots />
        </div>
      )}
    </div>
  );
}
