import { MouseEvent } from "react";
import cx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

type ButtonProps = {
  onClick?: (e: MouseEvent) => void;
  children: string;
  className?: string;
  leftIcon?: IconProp;
  sizeIcon?: SizeProp;
  variant?: "primary" | "subtle" | "default";
};

export function Button({ variant = "default", ...props }: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={cx(
        "transition py-[6px] px-3 text-sm font-semibold rounded-sm",
        {
          "bg-slate-200 hover:bg-slate-300": variant === "default",
          "hover:bg-slate-300": variant === "subtle",
          "bg-blue-600 hover:bg-blue-700 text-white": variant === "primary",
        },
        props.className
      )}
    >
      {props.leftIcon && (
        <FontAwesomeIcon
          icon={props.leftIcon}
          size={props.sizeIcon}
          className="mr-3"
        />
      )}
      {props.children}
    </button>
  );
}
