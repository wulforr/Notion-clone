import styles from "./style.module.css";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";

export default function TaskCard({
  card,
  setDraggedCard,
  groupId,
  onDragOver,
}) {
  const [isHovered, setIsHovered] = useState(false);
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
      <div>{card.cardTitle}</div>
      {isHovered && (
        <div className={styles.menu}>
          <BsThreeDots />
        </div>
      )}
    </div>
  );
}
