import { ButtonAction } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import cx from "clsx";
import usePopover from "@/hooks/usePopover";
import { LabelModalProps } from "@/types/label";
import { FormLabel, FormSelectLabel } from ".";
import { useState } from "react";
import { Label } from "@/types/task";

type Mode = "select" | "create" | "edit";

export function ActionLabel({ labelsActive, withIcon }: LabelModalProps) {
  const [mode, setMode] = useState<Mode>("select");
  const [labelSelected, setLabelSelected] = useState<Label | null>(null);

  const { open, toggleOpen, onClose } = usePopover();

  const handleClickButtonCreate = () => {
    setMode("create");
  };

  const handleClickButtonEdit = (label: Label) => {
    setMode("edit");
    setLabelSelected(label);
  };

  const handleBack = () => {
    setMode("select");
    setLabelSelected(null);
  };

  const handleClose = () => {
    onClose();
    setMode("select");
  };

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger className={cx({ "w-full": withIcon })}>
        {withIcon ? (
          <ButtonAction icon={faTags}>Labels</ButtonAction>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleOpen(true);
            }}
            className="relative z-50 underline underline-offset-1"
          >
            Edit
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent align="end">
        {mode === "edit" || mode === "create" ? (
          <FormLabel
            initialForm={labelSelected}
            type={mode}
            onBack={handleBack}
            onClose={handleClose}
          />
        ) : (
          <FormSelectLabel
            onClose={handleClose}
            onClickButtonCreate={handleClickButtonCreate}
            onClickButtonEdit={handleClickButtonEdit}
            labelsActive={labelsActive}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
