import styles from "./style.module.css";
import { BsThreeDots } from "react-icons/bs";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import Modal from "../Modal/Modal";
import Navbar from "../Navbar/Navbar";
import Select from "react-select";

export default function TaskCard({
  card,
  setDraggedCard,
  group,
  onDragOver,
  newCard,
  newCardRef,
  statusOptions,
}) {
  const { groupId, groupTitle } = group;
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const text = useRef("");
  const titleRef = useRef(card.cardTitle || "Empty");
  const descriptionRef = useRef(card.cardDescription || "add description");
  const [selectedStatus, setSelectedStatus] = useState({
    value: groupTitle,
    label: groupTitle,
  });

  const handleChange = (evt, ref) => {
    ref.current = evt.target.value;
  };

  console.log("isopen in card with cardId: ", card.cardId, isOpen);

  //   const handleChange = (evt) => {
  //     text.current = evt.target.value;
  //   };

  const handleBlur = () => {
    console.log(text.current);
  };

  //   const setFocus = () => {
  //     console.log(editDivRef.current);
  //     editDivRef.current.el.current.focus();
  //   };

  const handleSaveAndClose = (e) => {
    e.stopPropagation();
    const title = titleRef.current;
    const description = descriptionRef.current;
    console.log("logging", title, description);
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
      {card.cardId === newCard?.cardId ? (
        <ContentEditable
          html={text.current}
          onBlur={handleBlur}
          onChange={(e) => handleChange(e, text)}
          ref={newCardRef}
        />
      ) : (
        <div>{card.cardTitle || "Empty"}</div>
      )}

      {isHovered && (
        <div className={styles.menu}>
          <BsThreeDots />
        </div>
      )}

      <Modal open={isOpen} handleSaveAndClose={handleSaveAndClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.modalWrapper}
        >
          <Navbar isModal />
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
