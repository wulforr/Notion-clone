import { uuid } from "uuidv4";

export const initialData = [
  {
    groupId: uuid(),
    groupTitle: "not started",
    groupCards: [
      {
        cardId: uuid(),
        cardTitle: "card1",
      },
      {
        cardId: uuid(),
        cardTitle: "card2",
      },
      {
        cardId: uuid(),
        cardTitle: "card3",
      },
    ],
  },
  {
    groupId: uuid(),
    groupTitle: "Next Up",
    groupCards: [
      {
        cardId: uuid(),
        cardTitle: "card4",
      },
      {
        cardId: uuid(),
        cardTitle: "card5",
      },
      {
        cardId: uuid(),
        cardTitle: "card6",
      },
    ],
  },
  {
    groupId: uuid(),
    groupTitle: "this Week",
    groupCards: [
      {
        cardId: uuid(),
        cardTitle: "card7",
      },
      {
        cardId: uuid(),
        cardTitle: "card8",
      },
      {
        cardId: uuid(),
        cardTitle: "card9",
      },
    ],
  },
];
