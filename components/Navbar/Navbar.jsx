import { GiHamburgerMenu } from "react-icons/gi";
import { GoClock } from "react-icons/go";
import { AiOutlineStar } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineOpenInFull, MdDeleteOutline } from "react-icons/md";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { RiFileCopyLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import styles from "./style.module.css";

export default function Navbar({ isModal, handleDelete }) {
  return (
    <nav className={styles.nav}>
      {isModal ? (
        <div>
          <div className={styles.icons}>
            <MdOutlineOpenInFull />
          </div>
          <div>Open as page</div>
        </div>
      ) : (
        <div>
          <div className={styles.icons}>
            <GiHamburgerMenu />
          </div>
          <div>Task List</div>
        </div>
      )}
      <div>
        <div>Share</div>
        <div className={styles.icons}>
          <GoClock />
        </div>
        <div className={styles.icons}>
          <AiOutlineStar />
        </div>
        <div className={styles.icons}>
          {isModal ? (
            <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
              <Menu
                menuButton={
                  <MenuButton className={styles.menuButton}>
                    <BsThreeDots />
                  </MenuButton>
                }
                transition
              >
                <MenuItem className={styles.menuItem}>
                  <FiEdit /> Rename
                </MenuItem>
                <MenuItem className={styles.menuItem} onClick={handleDelete}>
                  <MdDeleteOutline /> Delete
                </MenuItem>
                <MenuItem className={styles.menuItem}>
                  <RiFileCopyLine /> Duplicate
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <BsThreeDots />
          )}
        </div>
      </div>
    </nav>
  );
}
