import { MdDeveloperBoard, MdKeyboardArrowDown } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import styles from "./style.module.css";

export default function TaskBoardHeader() {
  return (
    <div className={styles.taskBoardHeader}>
      <div className={styles.leftHeader}>
        <div>
          <MdDeveloperBoard className={styles.icon} />
          By Status <MdKeyboardArrowDown className={styles.icon} />
        </div>
      </div>
      <div>
        <div>Properties</div>
        <div>Group</div>
        <div>Sub group</div>
        <div>Filter</div>
        <div>Sort</div>
        <div>
          <BiSearchAlt2 className={styles.icon} />
          Search
        </div>
        <div>
          <BsThreeDots className={styles.icon} />
        </div>
        <div>
          <button className={styles.headerButton}>New</button>
          <button className={styles.headerButton}>
            <MdKeyboardArrowDown className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
}
