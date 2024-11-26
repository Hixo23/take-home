import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { useStore } from "../store";

export const Entrypoint = () => {
  const { setCards, cards, deletedCards } = useStore();
  const [isRevealed, setIsRevealed] = useState(false);
  const listQuery = useGetListData();


  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading, setCards]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">My Awesome List ({cards.length})</h1>
        <div className="flex flex-col gap-y-3">
          {cards.map((card) => (
            <Card key={card.id} title={card.title} description={card.description} isVisible={card.isVisible} id={card.id} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">Deleted Cards ({deletedCards.length})</h1>
          <button
            disabled={deletedCards.length === 0}
            onClick={() => setIsRevealed(!isRevealed)}
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
          >
            {isRevealed ? "Hide" : "Reveal"}
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {isRevealed ? deletedCards.map((card) => (
            <Card key={card.id} {...card} isDeleted={true} />
          )) : null}
        </div>
      </div>
    </div>
  );
};
