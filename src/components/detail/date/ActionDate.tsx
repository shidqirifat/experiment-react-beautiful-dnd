import { Button, ButtonAction } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePicker, TimeInput } from "@mantine/dates";
import usePopover from "@/hooks/usePopover";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef } from "react";
import { ActionIcon } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DueDate } from "@/types/task";
import { useDueDate } from "@/hooks/useDueDate";

type ActionDateProps = {
  dueDate: DueDate | undefined;
  onSave: (startDate: string, endDate: string) => void;
  onRemove: () => void;
};

export function ActionDate({ dueDate, onSave, onRemove }: ActionDateProps) {
  const {
    dates,
    time,
    disabledSaveButton,
    setDates,
    setTime,
    resetInput,
    generateDateSave,
  } = useDueDate(dueDate);
  const { open, toggleOpen, onClose } = usePopover();
  const ref = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSave(...generateDateSave());
    onClose();
  };

  const handleRemove = () => {
    onRemove();
    onClose();
  };

  useEffect(() => {
    if (!open) resetInput();
  }, [open]);

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <FontAwesomeIcon icon={faClock} size="sm" />
    </ActionIcon>
  );

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger className="w-full">
        <ButtonAction icon={faClock}>Date</ButtonAction>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="space-y-4">
          <PopoverHeader onClose={onClose}>Date</PopoverHeader>
          <DatePicker
            type="range"
            allowSingleDateInRange
            value={dates}
            onChange={setDates}
          />
          <TimeInput
            value={time}
            onChange={(e) => setTime(e.target.value)}
            label="Due time"
            placeholder="Input time"
            ref={ref}
            rightSection={pickerControl}
          />
          <div className="grid gap-2">
            <Button
              type="submit"
              variant="solid"
              onClick={handleSave}
              disabled={disabledSaveButton}
            >
              Save
            </Button>
            <Button
              variant="subtle"
              className="bg-slate-200 hover:!bg-slate-300"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
