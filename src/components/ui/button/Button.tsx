import { MouseEvent } from "react";
import cx from "clsx";

type ButtonProps = {
  onClick?: (e: MouseEvent) => void;
  children: string;
  className?: string;
};

export function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "bg-slate-200 hover:bg-slate-300 transition py-[6px] px-3 text-sm font-semibold rounded-sm",
        className
      )}
    >
      {children}
    </button>
  );
}
