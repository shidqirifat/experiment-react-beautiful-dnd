import { DueDate } from "../../types/reorder";
import { formatDate, getDayToNow } from "../../utils/time";
import cx from "clsx";

type DateProps = { dueDate: DueDate | undefined };

export const Date = ({ dueDate }: DateProps) => {
  if (!dueDate) return null;

  const { date, is_done } = dueDate;
  const dayToNow = getDayToNow(date);
  const isPast = dayToNow < 0;

  return (
    <button
      className={cx("py-1 px-2 rounded w-max mt-1", {
        "bg-yellow-400": !is_done && !isPast && dayToNow < 1,
        "bg-slate-200": !is_done && !isPast,
        "bg-red-400": !is_done && isPast,
        "bg-green-500": is_done,
      })}
    >
      <h4 className="text-xs">📅 {formatDate(date, "MMM D")}</h4>
    </button>
  );
};
