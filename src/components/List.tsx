import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";
import { useStore } from "../store";

type CardProps = {
  title: ListItem["title"];
  description?: ListItem["description"];
  isVisible: ListItem["isVisible"]
  id: ListItem["id"];
  isDeleted?: boolean;
};

export const Card: FC<CardProps> = ({ title, description, isVisible, id, isDeleted }) => {
  const { toggleHiddenCard, toggleDeleteCard } = useStore()

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          {isDeleted ? null : <ExpandButton onClick={() => toggleHiddenCard(id)}>
            {isVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ExpandButton>
          }
          {isDeleted ? null : <DeleteButton onClick={() => toggleDeleteCard(id)} />}
        </div>
      </div>
      {isDeleted ? null : <p className={`text-sm transition-all duration-150 ease-in-out ${isVisible ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>{description}</p>}
    </div>
  );
};
