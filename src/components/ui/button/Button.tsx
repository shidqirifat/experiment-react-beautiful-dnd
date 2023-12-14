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
};

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={cx(
        "bg-slate-200 hover:bg-slate-300 transition py-[6px] px-3 text-sm font-semibold rounded-sm",
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
