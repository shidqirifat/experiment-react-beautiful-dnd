import { ButtonHTMLAttributes, MouseEvent, ReactNode, forwardRef } from "react";
import cx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: MouseEvent) => void;
  children: ReactNode;
  className?: string;
  leftIcon?: IconProp;
  sizeIcon?: SizeProp;
  variant?: "primary" | "subtle" | "default";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = "default",
    type = "button",
    leftIcon,
    sizeIcon,
    className,
    ...props
  }: ButtonProps) => {
    return (
      <button
        type={type}
        onClick={props.onClick}
        className={cx(
          "transition py-[6px] px-3 text-sm font-semibold rounded-sm",
          {
            "bg-slate-200 hover:bg-slate-300": variant === "default",
            "hover:bg-slate-300": variant === "subtle",
            "bg-blue-600 hover:bg-blue-700 text-white": variant === "primary",
          },
          {
            "grid grid-cols-[20px_1fr] gap-2": leftIcon,
          },
          className
        )}
        {...props}
      >
        {leftIcon && (
          <div className="h-full grid place-content-center">
            <FontAwesomeIcon icon={leftIcon} size={sizeIcon} />
          </div>
        )}
        {props.children}
      </button>
    );
  }
);
