import { GiHamburgerMenu } from "react-icons/gi";
import { GoClock } from "react-icons/go";
import { AiOutlineStar } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import styles from "./style.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div>
        <div className={styles.icons}>
          <GiHamburgerMenu />
        </div>
        <div>Task List</div>
      </div>
      <div>
        <div>Share</div>
        <div className={styles.icons}>
          <GoClock />
        </div>
        <div className={styles.icons}>
          <AiOutlineStar />
        </div>
        <div className={styles.icons}>
          <BsThreeDots />
        </div>
      </div>
    </nav>
  );
}
