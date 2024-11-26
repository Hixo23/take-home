import { create } from "zustand";
import { DeletedListItem, ListItem } from "./api/getListData";

type State = {
  cards: ListItem[],
  deletedCards: DeletedListItem[],
};

type Actions = {
  setCards: (cards: ListItem[]) => void
  toggleDeleteCard: (id: number) => void
  toggleHiddenCard: (id: number) => void
};



export const useStore = create<State & Actions>((set) => ({
  cards: [],
  deletedCards: [],
  setCards: (cards) => {
    set(() => ({
      cards: cards.map((card) => ({
        ...card,
        isVisible: false,
      })),
    }));
  },
  toggleHiddenCard: (id) => {
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === id
          ? { ...card, isVisible: !card.isVisible }
          : card
      ),
    }));
  },
  toggleDeleteCard: (id) => set((state) => {
    const isDeleted = state.deletedCards.some((card) => card.id === id);
    if (isDeleted) {
      const restoredCard = state.deletedCards.find((card) => card.id === id)!;
      return {
        deletedCards: state.deletedCards.filter((card) => card.id !== id),
        cards: [...state.cards, restoredCard]
      };
    } else {
      const cardToDelete = state.cards.find((card) => card.id === id)!;
      return {
        deletedCards: [...state.deletedCards, { ...cardToDelete }],
        cards: state.cards.filter((card) => card.id !== id)
      };
    }
  })
}));

