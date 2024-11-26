import { create } from "zustand";
import { DeletedListItem, ListItem } from "./api/getListData";

type State = {
  cards: ListItem[],
  deletedCards: DeletedListItem[],
};

type Actions = {
  setCards: (cards: ListItem[]) => void
  toggleHiddenCard: (id: number) => void
  deleteCard: (id: number) => void
  revertCard: (id: number) => void
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
  deleteCard: (id) => {
    set((state) => {
      const card = state.cards.find((card) => card.id === id);
      if (card) {
        return {
          cards: state.cards.filter((card) => card.id !== id),
          deletedCards: [...state.deletedCards, card],
        };
      }
      return state;
    });
  },
  revertCard: (id) => {
    // Implement this action
    set((state) => {
      console.log(id)
      return state
    })
  }
}));

