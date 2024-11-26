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
  toggleDeleteCard(id) {
    set((state) => ({
      deletedCards: [...state.deletedCards, state.cards.find((card) => card.id === id)!],
      cards: state.cards.filter((card) => card.id !== id),
    }))
  }

}));

