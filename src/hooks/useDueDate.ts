import { DueDate } from "@/types/task";
import { formatDate, getDateNextHour, getDueDateTime } from "@/utils/time";
import { useCallback, useEffect, useMemo, useState } from "react";

const getInitialDate = (date: string | undefined) => {
  if (date) return new Date(date);
  return getDateNextHour(8);
};

const getInitialTime = (date: string | undefined) => {
  if (date) return formatDate(date, "HH:mm");
  return formatDate(getDateNextHour(8).toISOString(), "HH:mm");
};

export function useDueDate(dueDate: DueDate | undefined) {
  const initialDates = useMemo<[Date, Date]>(() => {
    return [
      getInitialDate(dueDate?.start_date),
      getInitialDate(dueDate?.end_date),
    ];
  }, [dueDate]);

  const initialTime = useMemo(
    () => getInitialTime(dueDate?.end_date),
    [dueDate]
  );

  const [dates, setDates] = useState<[Date | null, Date | null]>(initialDates);
  const [time, setTime] = useState(initialTime);

  const resetInput = useCallback(() => {
    setDates(initialDates);
    setTime(initialTime);
  }, [initialDates, initialTime]);

  const generateDateSave = useCallback((): [string, string] => {
    const startDate = dates[0]?.toISOString() as string;
    const endDate = getDueDateTime(dates[1]?.toISOString() as string, time);

    return [startDate, endDate];
  }, [dates, time]);

  const disabledSaveButton = useMemo(
    () => dates.some((value) => !value) || !time,
    [dates, time]
  );

  useEffect(() => resetInput(), [resetInput]);

  return {
    dates,
    time,
    disabledSaveButton,
    setDates,
    setTime,
    resetInput,
    generateDateSave,
  };
}
