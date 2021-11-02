import styles from "./style.module.css";
import { BsThreeDots } from "react-icons/bs";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { RiFileCopyLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdGroup, MdDeleteOutline } from "react-icons/md";
import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import Modal from "../Modal/Modal";
import Navbar from "../Navbar/Navbar";
import Select from "react-select";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export default function TaskCard({
  card,
  setDraggedCard,
  group,
  groups,
  onDragOver,
  newCard,
  newCardRef,
  statusOptions,
  updateGroup,
}) {
  const { groupId, groupTitle, groupCards } = group;
  const { cardId, cardDescription, cardTitle } = card;
  const defaultStatus = {
    value: groupTitle,
    label: groupTitle,
  };
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const text = useRef("");
  const titleRef = useRef(cardTitle || "Empty");
  const descriptionRef = useRef(cardDescription || "add description");
  const [selectedStatus, setSelectedStatus] = useState(defaultStatus);

  const handleChange = (evt, ref) => {
    ref.current = evt.target.value;
  };

  const handleSaveAndClose = (e) => {
    e.stopPropagation();
    updateCard();
    setIsOpen(false);
  };

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

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const updateCard = () => {
    const updatedCard = {
      cardId,
      cardTitle: titleRef.current,
      cardDescription: titleRef.current,
    };
    if (selectedStatus.value === groupTitle) {
      const cardsAfterUpdating = groupCards.map((card) => {
        if (card.cardId === cardId) {
          return updatedCard;
        }
        return card;
      });
      updateGroup(groupId, {
        ...group,
        groupCards: cardsAfterUpdating,
      });
    } else {
      const oldStatusGroup = { ...group };
      const newStatusGroup = groups.filter(
        (group) => group.groupTitle === selectedStatus.value
      )[0];

      oldStatusGroup.groupCards = oldStatusGroup.groupCards.filter(
        (card) => card.cardId !== cardId
      );
      updateGroup(groupId, oldStatusGroup);
      newStatusGroup.groupCards = [...newStatusGroup.groupCards, updatedCard];
      updateGroup(newStatusGroup.groupId, newStatusGroup);
    }
  };

  const handleDelete = () => {
    const groupCardsAfterDeleting = groupCards.filter(
      (card) => card.cardId !== cardId
    );
    updateGroup(groupId, { ...group, groupCards: groupCardsAfterDeleting });
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
      onClick={() => setIsOpen(true)}
    >
      {cardId === newCard?.cardId ? (
        <ContentEditable
          html={text.current}
          onChange={(e) => handleChange(e, text)}
          ref={newCardRef}
        />
      ) : (
        <div>{cardTitle || "Empty"}</div>
      )}

      {/* {isHovered && ( */}
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
      {/* )} */}

      <Modal open={isOpen} handleSaveAndClose={handleSaveAndClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.modalWrapper}
        >
          <Navbar isModal handleDelete={handleDelete} />
          <div className={styles.modalContent}>
            <ContentEditable
              html={titleRef.current}
              onChange={(e) => handleChange(e, titleRef)}
              className={styles.modalTitle}
            />
            <div className={styles.modalRow}>
              <div>
                <div className={styles.modalIcon}>
                  <IoMdArrowDropdownCircle />
                </div>
                <div>Status</div>
              </div>
              <div>
                <Select
                  value={selectedStatus}
                  options={statusOptions}
                  onChange={handleStatusChange}
                />
              </div>
            </div>
            <div className={styles.modalRow}>
              <div>
                <div className={styles.modalIcon}>
                  <MdGroup />
                </div>
                <div>Assign</div>
              </div>
              <div></div>
            </div>
            <ContentEditable
              html={descriptionRef.current}
              onChange={(e) => handleChange(e, descriptionRef)}
              className={styles.modalDescription}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
