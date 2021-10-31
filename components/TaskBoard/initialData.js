import { v4 as uuidv4 } from "uuid";

export const initialData = [
  {
    groupId: 1,
    groupTitle: "not started",
    groupCards: [
      {
        cardId: 1,
        cardTitle: "card1",
        cardDescription: "card description",
      },
      {
        cardId: 2,
        cardTitle: "card2",
        cardDescription: "card description",
      },
      {
        cardId: 3,
        cardTitle: "card3",
        cardDescription: "card description",
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
        cardDescription: "card description",
      },
      {
        cardId: 5,
        cardTitle: "card5",
        cardDescription: "card description",
      },
      {
        cardId: 6,
        cardTitle: "card6",
        cardDescription: "card description",
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
        cardDescription: "card description",
      },
      {
        cardId: 8,
        cardTitle: "card8",
        cardDescription: "card description",
      },
      {
        cardId: 9,
        cardTitle: "card9",
        cardDescription: "card description",
      },
    ],
  },
];
