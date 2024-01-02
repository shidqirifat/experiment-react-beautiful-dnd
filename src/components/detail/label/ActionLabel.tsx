import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import usePopover from "@/hooks/usePopover";
import { LabelModalProps } from "@/types/label";
import { ActionDelete, FormLabel, FormSelectLabel } from ".";
import { useState } from "react";
import { Label } from "@/types/task";
import { useLabels } from "@/hooks/useLabels";

type Mode = "select" | "create" | "edit" | "delete";

export function ActionLabel({
  labelsActive,
  align = "end",
  onSelect,
  children,
}: LabelModalProps) {
  const [mode, setMode] = useState<Mode>("select");
  const [labelSelected, setLabelSelected] = useState<Label | null>(null);
  const { onDelete } = useLabels();
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
    setTimeout(() => {
      setMode("select");
    }, 200);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setTimeout(() => {
      handleBack();
    }, 100);
  };

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger className="w-full">{children}</PopoverTrigger>
      <PopoverContent align={align}>
        {(mode === "edit" || mode === "create") && (
          <FormLabel
            initialForm={labelSelected}
            type={mode}
            onBack={handleBack}
            onClose={handleClose}
            onDelete={() => setMode("delete")}
          />
        )}
        {mode === "select" && (
          <FormSelectLabel
            onClose={handleClose}
            onClickButtonCreate={handleClickButtonCreate}
            onClickButtonEdit={handleClickButtonEdit}
            onSelectLabel={onSelect}
            labelsActive={labelsActive}
          />
        )}
        {mode === "delete" && labelSelected && (
          <ActionDelete
            onBack={() => setMode("edit")}
            onClose={handleClose}
            onDelete={() => handleDelete(labelSelected.id)}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
