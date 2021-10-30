import styles from "./style.module.css";
import { useState } from "react";
import { BsThreeDots, BsPlusLg } from "react-icons/bs";

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
        <div className={styles.groupTitle}>{groupTitle}</div>
        <div>{totalCards}</div>
      </div>
      {isHovered && (
        <div className={styles.right}>
          <div>
            <BsThreeDots />
          </div>
          <div className={styles.headerPlusIcon}>
            <BsPlusLg />
          </div>
        </div>
      )}
    </div>
  );
}
