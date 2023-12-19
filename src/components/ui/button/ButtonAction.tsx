import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from ".";
import { MouseEvent } from "react";

type ButtonActionProps = {
  children: string;
  icon: IconProp;
  sizeIcon?: SizeProp;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export const ButtonAction = (props: ButtonActionProps) => {
  return (
    <Button {...props} leftIcon={props.icon} className="w-full text-left">
      {props.children}
    </Button>
  );
};
