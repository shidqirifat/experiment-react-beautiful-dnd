import {
  FlipProp,
  IconProp,
  SizeProp,
} from "@fortawesome/fontawesome-svg-core";
import { Button } from ".";
import { MouseEvent } from "react";

type ButtonActionProps = {
  children: string;
  icon: IconProp;
  sizeIcon?: SizeProp;
  flipIcon?: FlipProp;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: "solid" | "subtle" | "default";
  color?: "primary" | "danger";
};

export const ButtonAction = (props: ButtonActionProps) => {
  return (
    <Button {...props} leftIcon={props.icon} className="w-full text-left">
      {props.children}
    </Button>
  );
};
