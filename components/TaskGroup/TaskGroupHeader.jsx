import styles from "./style.module.css";
import { useState } from "react";
import { BsThreeDots, BsPlus } from "react-icons/bs";

export default function TaskGroupHeader({ groupTitle, totalCards }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className={styles.groupHeader}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.left}>
        <div>{groupTitle}</div>
        <div>{totalCards}</div>
      </div>
      {isHovered && (
        <div className={styles.right}>
          <div>
            <BsThreeDots />
          </div>
          <div>
            <BsPlus />
          </div>
        </div>
      )}
    </div>
  );
}
