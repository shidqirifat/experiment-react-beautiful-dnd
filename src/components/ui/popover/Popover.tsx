"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/utils";
import { Button } from "../button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import cx from "clsx";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border border-slate-200 bg-white pt-4 px-3 pb-3 text-slate-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

type PopoverHeaderProps = {
  children: string;
  size?: "md" | "lg";
  onClose: () => void;
  onBack?: () => void;
};

const PopoverHeader = ({
  children,
  size = "md",
  onClose,
  onBack,
}: PopoverHeaderProps) => {
  return (
    <div>
      {onBack && (
        <Button
          onClick={onBack}
          variant="subtle"
          className={cx("absolute left-3", {
            "top-3": size === "md",
            "top-[14px]": size === "lg",
          })}
        >
          <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#808080" }} />
        </Button>
      )}
      <h2
        className={cx("text-slate-700 font-semibold text-center", {
          "text-sm": size === "md",
          "text-base": size === "lg",
        })}
      >
        {children}
      </h2>
      <Button
        variant="subtle"
        className={cx("absolute right-3", {
          "top-3": size === "md",
          "top-[14px]": size === "lg",
        })}
        onClick={onClose}
      >
        <FontAwesomeIcon
          icon={faXmark}
          size={size === "md" ? undefined : size}
          style={{ color: "#808080" }}
        />
      </Button>
    </div>
  );
};

export { Popover, PopoverTrigger, PopoverHeader, PopoverContent };
