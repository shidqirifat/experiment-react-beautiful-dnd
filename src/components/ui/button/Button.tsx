import { ComponentProps, forwardRef } from "react";
import cx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

type ButtonProps = ComponentProps<"button"> & {
  className?: string;
  leftIcon?: IconProp;
  sizeIcon?: SizeProp;
  variant?: "solid" | "subtle" | "default";
  color?: "primary" | "danger";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      type = "button",
      color = "primary",
      leftIcon,
      sizeIcon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={cx(
          "transition py-[6px] px-3 text-sm font-semibold rounded-sm",
          {
            "bg-slate-200 hover:bg-slate-300": variant === "default",
            "hover:bg-slate-300": variant === "subtle",
            "bg-blue-600 hover:bg-blue-700 text-white":
              variant === "solid" && color === "primary",
            "bg-red-600 hover:bg-red-700 text-white":
              variant === "solid" && color === "danger",
          },
          {
            "grid grid-cols-[20px_1fr] gap-2": leftIcon,
          },
          className
        )}
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
