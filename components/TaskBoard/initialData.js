import { v4 as uuidv4 } from "uuid";

export const initialData = [
  {
    groupId: 1,
    groupTitle: "not started",
    groupCards: [
      {
        cardId: 1,
        cardTitle: "card1",
      },
      {
        cardId: 2,
        cardTitle: "card2",
      },
      {
        cardId: 3,
        cardTitle: "card3",
      },
    ],
  },
  {
    groupId: 2,
    groupTitle: "Next Up",
    groupCards: [
      {
        cardId: 4,
        cardTitle: "card4",
      },
      {
        cardId: 5,
        cardTitle: "card5",
      },
      {
        cardId: 6,
        cardTitle: "card6",
      },
    ],
  },
  {
    groupId: 3,
    groupTitle: "this Week",
    groupCards: [
      {
        cardId: 7,
        cardTitle: "card7",
      },
      {
        cardId: 8,
        cardTitle: "card8",
      },
      {
        cardId: 9,
        cardTitle: "card9",
      },
    ],
  },
];
