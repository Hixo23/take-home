import { FC } from "react";
import { RevertIcon, XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

interface ToggleButtonProps extends Omit<ButtonProps, "children"> {
  isDeleted: boolean;
}

export const ExpandButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      <XMarkIcon />
    </button>
  );
};

export const ToggleButton: FC<ToggleButtonProps> = (props) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>{props.isDeleted ? <RevertIcon /> : < XMarkIcon />}</button>
  )
}
