import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import usePopover from "@/hooks/usePopover";
import { LabelModalProps } from "@/types/label";
import { LabelsWrapper } from "./LabelsWrapper";

export function ActionLabel({
  labelsActive,
  align = "end",
  onSelect,
  children,
}: LabelModalProps) {
  const { open, toggleOpen, onClose } = usePopover();

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger className="w-full">{children}</PopoverTrigger>
      <PopoverContent align={align}>
        <LabelsWrapper
          onClose={onClose}
          labelsActive={labelsActive}
          onSelect={onSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
