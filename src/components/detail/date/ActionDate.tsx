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
import { useEffect, useMemo, useRef, useState } from "react";
import { ActionIcon } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate, getDateNextHour, getDueDateTime } from "@/utils/time";
import { DueDate } from "@/types/task";

const getInitialDate = (date: string | undefined) => {
  if (date) return new Date(date);
  return getDateNextHour(8);
};

const getInitialTime = (date: string | undefined) => {
  if (date) return formatDate(date, "HH:mm");
  return formatDate(getDateNextHour(8).toISOString(), "HH:mm");
};

type ActionDateProps = {
  dates: DueDate | undefined;
  onSave: (startDate: string, endDate: string) => void;
  onRemove: () => void;
};

export function ActionDate({ dates, onSave, onRemove }: ActionDateProps) {
  const initialDates = useMemo<[Date, Date]>(() => {
    return [getInitialDate(dates?.start_date), getInitialDate(dates?.end_date)];
  }, [dates]);

  const initialTime = useMemo(() => getInitialTime(dates?.end_date), [dates]);

  const [date, setDate] = useState<[Date | null, Date | null]>(initialDates);
  const [time, setTime] = useState(initialTime);
  const { open, toggleOpen, onClose } = usePopover();
  const ref = useRef<HTMLInputElement>(null);

  const resetInput = () => {
    setDate(initialDates);
    setTime(initialTime);
  };

  const handleSave = () => {
    const startDate = date[0]?.toISOString() as string;
    const endDate = getDueDateTime(date[1]?.toISOString() as string, time);

    onSave(startDate, endDate);
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
            value={date}
            onChange={setDate}
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
              disabled={date.some((value) => !value)}
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
